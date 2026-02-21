import { spawnSync } from "child_process";
import path from "path";

import { NextResponse } from "next/server";

export const runtime = "nodejs";

type PipelineResult = {
  success: boolean;
  message: string;
  verified?: boolean;
  proofPath?: string;
  publicSignalsPath?: string;
};

function splitLines(text: string): string[] {
  return text
    .split(/\r?\n/)
    .map((line) => line.trimEnd())
    .filter((line) => line.length > 0);
}

export async function POST(req: Request) {
  try {
    const body = await req.json();
    const score = Number(body?.score);

    if (!Number.isFinite(score)) {
      return NextResponse.json({ ok: false, error: "Invalid score payload." }, { status: 400 });
    }

    const generatorDir = path.resolve(process.cwd(), "../backend/zkProofGeneratorTest");
    const runnerPath = path.join(generatorDir, "runPipelineFromScore.js");
    const proc = spawnSync("node", [runnerPath, String(Math.round(score))], {
      cwd: generatorDir,
      encoding: "utf-8",
      maxBuffer: 1024 * 1024 * 20,
    });
    const stdout = (proc.stdout ?? "").trim();
    const stderr = (proc.stderr ?? "").trim();
    const stdoutLines = splitLines(stdout);
    const stderrLines = splitLines(stderr);
    const lastStdoutLine = stdoutLines.at(-1);
    const pipelineLogs = stdoutLines.slice(0, -1);

    if (!lastStdoutLine) {
      return NextResponse.json(
        { ok: false, error: stderr || "Pipeline produced no output.", pipelineLogs, stderrLogs: stderrLines },
        { status: 500 },
      );
    }

    let result: PipelineResult;
    try {
      result = JSON.parse(lastStdoutLine) as PipelineResult;
    } catch {
      return NextResponse.json(
        {
          ok: false,
          error: "Could not parse pipeline output.",
          details: stderr || stdout.slice(-1200),
          pipelineLogs,
          stderrLogs: stderrLines,
        },
        { status: 500 },
      );
    }

    if (proc.status !== 0 || !result.success) {
      return NextResponse.json(
        {
          ok: false,
          error: result.message,
          verified: result.verified ?? false,
          pipelineLogs,
          stderrLogs: stderrLines,
        },
        { status: 400 },
      );
    }

    return NextResponse.json({
      ok: true,
      message: result.message,
      verified: result.verified ?? false,
      proofPath: result.proofPath,
      publicSignalsPath: result.publicSignalsPath,
      pipelineLogs,
      stderrLogs: stderrLines,
    });
  } catch (e: unknown) {
    const message = e instanceof Error ? e.message : String(e);
    return NextResponse.json({ ok: false, error: message }, { status: 500 });
  }
}
