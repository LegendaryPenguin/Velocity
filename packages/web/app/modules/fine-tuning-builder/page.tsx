"use client";

import { useMemo, useState } from "react";

import { AddToProjectSteps } from "@/components/builders/AddToProjectSteps";
import { CodeOutput } from "@/components/builders/CodeOutput";
import { ConceptCard } from "@/components/builders/ConceptCard";
import { ConfigPanel } from "@/components/builders/ConfigPanel";
import { FineTuningVisualDiagram } from "@/components/builders/FineTuningVisualDiagram";
import { FlowDiagram } from "@/components/builders/FlowDiagram";
import { PlacementGuide } from "@/components/builders/PlacementGuide";
import { WorkedExample } from "@/components/builders/WorkedExample";
import Link from "next/link";

export default function FineTuningBuilderPage() {
  const [neftuneNoiseAlpha, setNeftuneNoiseAlpha] = useState(5);
  const [numTrainEpochs, setNumTrainEpochs] = useState(1);
  const [batchSize, setBatchSize] = useState(2);
  const [learningRate, setLearningRate] = useState(0.0002);
  const [maxSteps, setMaxSteps] = useState(3);
  const [modelChoice, setModelChoice] = useState<"qwen-small" | "qwen-large">("qwen-small");

  const configSnippet = useMemo(
    () => JSON.stringify(
      {
        neftune_noise_alpha: neftuneNoiseAlpha,
        num_train_epochs: numTrainEpochs,
        per_device_train_batch_size: batchSize,
        learning_rate: learningRate,
        max_steps: maxSteps,
      },
      null,
      2
    ),
    [neftuneNoiseAlpha, numTrainEpochs, batchSize, learningRate, maxSteps]
  );

  const installCliSnippet = useMemo(
    () => `# Install CLI (Node >= 22.0.0 required)
pnpm install @0glabs/0g-serving-broker -g`,
    []
  );

  const setupSnippets = useMemo(
    () => ({
      setupNetwork: `# Setup network
0g-compute-cli setup-network`,
      login: `# Login with your wallet private key
0g-compute-cli login`,
      deposit: `# Deposit funds (e.g. 3 0G)
0g-compute-cli deposit --amount 3`,
      transfer: `# Transfer to provider for fine-tuning
# IMPORTANT: Use --service fine-tuning (otherwise funds go to inference)
0g-compute-cli transfer-fund --provider <PROVIDER_ADDRESS> --amount 2 --service fine-tuning`,
    }),
    []
  );

  const datasetFormatSnippet = useMemo(
    () => `# Format 1: Instruction-Input-Output
{"instruction": "Translate to French", "input": "Hello world", "output": "Bonjour le monde"}
{"instruction": "Summarize", "input": "Long article...", "output": "Brief summary"}

# Format 2: Chat Messages
{"messages": [{"role": "user", "content": "What is 2+2?"}, {"role": "assistant", "content": "2+2 equals 4."}]}

# Format 3: Simple Text
{"text": "The quick brown fox jumps over the lazy dog."}

# File: .jsonl, UTF-8, min 10 examples recommended`,
    []
  );

  const listProvidersSnippet = useMemo(
    () => `0g-compute-cli fine-tuning list-providers`,
    []
  );

  const listModelsSnippet = useMemo(
    () => `0g-compute-cli fine-tuning list-models

# Use model names WITHOUT Qwen/ prefix:
# ✅ --model "Qwen2.5-0.5B-Instruct"
# ❌ --model "Qwen/Qwen2.5-0.5B-Instruct"`,
    []
  );

  const createTaskSnippet = useMemo(
    () => `# Option A: Local dataset (recommended - auto-uploads to 0G Storage)
0g-compute-cli fine-tuning create-task \\
  --provider <PROVIDER_ADDRESS> \\
  --model <MODEL_NAME> \\
  --dataset-path <PATH_TO_DATASET.jsonl> \\
  --config-path <PATH_TO_CONFIG.json>

# Option B: Using dataset root hash (if you uploaded separately)
0g-compute-cli fine-tuning create-task \\
  --provider <PROVIDER_ADDRESS> \\
  --model <MODEL_NAME> \\
  --dataset <DATASET_ROOT_HASH> \\
  --config-path <PATH_TO_CONFIG.json>`,
    []
  );

  const monitorSnippet = useMemo(
    () => `# Check task status
0g-compute-cli fine-tuning get-task --provider <PROVIDER_ADDRESS> --task <TASK_ID>

# View logs
0g-compute-cli fine-tuning get-log --provider <PROVIDER_ADDRESS> --task <TASK_ID>

# When status = Delivered: download within 48 hours
0g-compute-cli fine-tuning acknowledge-model \\
  --provider <PROVIDER_ADDRESS> \\
  --task-id <TASK_ID> \\
  --data-path /path/to/encrypted_model.bin`,
    []
  );

  const decryptSnippet = useMemo(
    () => `# After status = Finished (wait ~1 min after acknowledge)
0g-compute-cli fine-tuning decrypt-model \\
  --provider <PROVIDER_ADDRESS> \\
  --task-id <TASK_ID> \\
  --encrypted-model /path/to/encrypted_model.bin \\
  --output /path/to/model_output.zip

# Extract LoRA adapter
unzip model_output.zip -d ./lora_adapter/`,
    []
  );

  const pythonInferenceSnippet = useMemo(() => {
    const modelPath = modelChoice === "qwen-small" ? "Qwen/Qwen2.5-0.5B-Instruct" : "Qwen/Qwen3-32B";
    const dtype = modelChoice === "qwen-small" ? "torch.bfloat16" : "torch.float16";
    return `# pip install torch transformers peft accelerate
from transformers import AutoModelForCausalLM, AutoTokenizer
from peft import PeftModel
import torch

base_model_path = "./base_model"  # or "${modelPath}"
lora_adapter_path = "./lora_adapter/output_model"

tokenizer = AutoTokenizer.from_pretrained(lora_adapter_path)
base_model = AutoModelForCausalLM.from_pretrained(
    base_model_path,
    torch_dtype=${dtype},
    device_map="auto"
)
model = PeftModel.from_pretrained(base_model, lora_adapter_path)

def generate_response(prompt, max_new_tokens=100):
    messages = [{"role": "user", "content": prompt}]
    text = tokenizer.apply_chat_template(messages, tokenize=False, add_generation_prompt=True)
    inputs = tokenizer(text, return_tensors="pt").to(model.device)
    outputs = model.generate(**inputs, max_new_tokens=max_new_tokens, do_sample=True, temperature=0.7)
    return tokenizer.decode(outputs[0][inputs['input_ids'].shape[1]:], skip_special_tokens=True)

print(generate_response("Hello, how are you?"))`;
  }, [modelChoice]);

  const pipRequirementsSnippet = useMemo(
    () => `# GPU (match CUDA version: nvidia-smi)
pip install torch torchvision torchaudio --index-url https://download.pytorch.org/whl/cu121
pip install transformers peft accelerate

# CPU only
pip install torch transformers peft accelerate`,
    []
  );

  const addToProjectSteps = useMemo(
    () => [
      { num: 1, title: "Install CLI & setup", body: "Node >= 22. Install @0glabs/0g-serving-broker. Run setup-network, login, deposit, transfer-fund --service fine-tuning.", filePath: "Terminal" },
      { num: 2, title: "Prepare config file", body: "Use the config template above. Only modify values—do not add or remove parameters. Use decimal notation (0.0002 not 2e-4).", filePath: "config.json" },
      { num: 3, title: "Prepare dataset", body: "JSONL format, .jsonl extension. Instruction-input-output, chat messages, or simple text. Min 10 examples.", filePath: "dataset.jsonl" },
      { num: 4, title: "Create task", body: "List providers, list models. Run create-task with --provider, --model, --dataset-path, --config-path.", filePath: "Terminal" },
      { num: 5, title: "Monitor & download", body: "get-task until Delivered. acknowledge-model within 48h. Wait for Finished, then decrypt-model.", filePath: "Terminal" },
      { num: 6, title: "Use LoRA", body: "Download base model from HuggingFace. Load LoRA with peft. Run inference.", filePath: "Python" },
    ],
    []
  );

  return (
    <div className="mx-auto max-w-3xl space-y-8">
      <div>
        <Link href="/dashboard" className="text-sm text-white/60 hover:text-white/90">
          ← Dashboard
        </Link>
        <h1 className="mt-2 text-2xl font-semibold">0G Fine-Tuning Builder</h1>
        <p className="mt-1 text-sm text-white/60">
          Step-by-step guide to fine-tune models on the 0G Compute Network using the CLI. Create tasks, monitor progress, and use your LoRA adapters.
        </p>
      </div>

      <ConceptCard
        title="0G Fine-Tuning"
        learnMore={
          <div className="space-y-2">
            <p>
              The 0G Compute Network lets you fine-tune models (e.g. Qwen) on decentralized providers. You pay per token; fees are auto-calculated. You receive a LoRA adapter to load on top of the base model. Must transfer funds with <code className="rounded bg-white/10 px-1">--service fine-tuning</code>.
            </p>
            <p><strong>Fee formula:</strong> Total = (tokens/1M) × pricePerMillion × epochs + Storage Reserve. Storage: Qwen2.5-0.5B ~0.01 0G, Qwen3-32B ~0.09 0G.</p>
            <p><strong>Progress:</strong> Init → SettingUp → SetUp → Training → Trained → Delivering → Delivered → UserAcknowledged → Finished. Download within 48h of Delivered.</p>
          </div>
        }
      >
        Fine-tune LLMs on 0G. Install the CLI, setup network, login with your wallet, deposit and transfer funds to a provider. Prepare a JSONL dataset and config file, create a task, monitor until Delivered, then download and decrypt your LoRA adapter.
      </ConceptCard>

      <div className="flex justify-center w-full">
        <FlowDiagram
          nodes={["Setup CLI", "Deposit & Transfer", "Prepare data", "Create task", "Monitor", "Download LoRA"]}
          icons={["⚙️", "💳", "📄", "🚀", "📊", "📦"]}
        />
      </div>
      <FineTuningVisualDiagram />

      <section className="glass-card rounded-2xl p-5">
        <h3 className="text-lg font-semibold text-white/90">Prerequisites</h3>
        <ul className="mt-3 space-y-2 text-sm text-white/80 list-disc list-inside">
          <li><strong>Node.js</strong> &gt;= 22.0.0</li>
          <li><strong>Wallet</strong> with private key for login</li>
          <li><strong>0G tokens</strong> to deposit and transfer to providers</li>
        </ul>
      </section>

      <section className="glass-card rounded-2xl p-5">
        <h3 className="text-lg font-semibold text-white/90">Quick Start</h3>
        <p className="mt-2 text-sm text-white/60">
          Run these commands in order. Use the copy button for each.
        </p>
        <div className="mt-4 space-y-4">
          <div>
            <p className="mb-2 text-sm font-medium text-white/90">1. Install CLI</p>
            <CodeOutput title="Terminal" code={installCliSnippet} />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-white/90">2. Setup network</p>
            <CodeOutput title="Terminal" code={setupSnippets.setupNetwork} />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-white/90">3. Login</p>
            <CodeOutput title="Terminal" code={setupSnippets.login} />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-white/90">4. Deposit funds</p>
            <CodeOutput title="Terminal" code={setupSnippets.deposit} />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-white/90">5. Transfer to provider (fine-tuning)</p>
            <CodeOutput title="Terminal" code={setupSnippets.transfer} />
            <p className="mt-2 text-xs text-amber-300/90">
              ⚠️ Must use <code className="rounded bg-white/10 px-1">--service fine-tuning</code>. Otherwise funds go to inference.
            </p>
          </div>
        </div>
      </section>

      <section className="glass-card rounded-2xl p-5">
        <h3 className="text-lg font-semibold text-white/90">List providers & models</h3>
        <div className="mt-4 space-y-4">
          <div>
            <p className="mb-2 text-sm font-medium text-white/90">List providers</p>
            <CodeOutput title="Terminal" code={listProvidersSnippet} />
          </div>
          <div>
            <p className="mb-2 text-sm font-medium text-white/90">List models</p>
            <CodeOutput title="Terminal" code={listModelsSnippet} />
          </div>
        </div>
      </section>

      <ConfigPanel
        title="Config template (training.json)"
        fields={[
          {
            id: "neftune",
            label: "neftune_noise_alpha",
            type: "number",
            value: neftuneNoiseAlpha,
            onChange: setNeftuneNoiseAlpha,
            helper: "0–10 (0=disabled). Typical: 5.",
          },
          {
            id: "epochs",
            label: "num_train_epochs",
            type: "number",
            value: numTrainEpochs,
            onChange: setNumTrainEpochs,
            helper: "1–3 typical for fine-tuning.",
          },
          {
            id: "batch",
            label: "per_device_train_batch_size",
            type: "number",
            value: batchSize,
            onChange: setBatchSize,
            helper: "1–4. Use 1 if OOM.",
          },
          {
            id: "lr",
            label: "learning_rate",
            type: "number",
            value: learningRate,
            onChange: setLearningRate,
            helper: "Use decimal: 0.0002 not 2e-4.",
          },
          {
            id: "maxSteps",
            label: "max_steps",
            type: "number",
            value: maxSteps,
            onChange: setMaxSteps,
            helper: "-1 = use epochs. Positive = max steps.",
          },
        ]}
      />

      <section>
        <h2 className="mb-3 text-lg font-semibold">Config file output</h2>
        <p className="mb-2 text-sm text-white/60">Copy this config. Do not add or remove parameters.</p>
        <CodeOutput title="config.json" code={configSnippet} />
      </section>

      <section className="glass-card rounded-2xl p-5">
        <h3 className="text-lg font-semibold text-white/90">Dataset format</h3>
        <p className="mt-2 text-sm text-white/60">
          JSONL format (.jsonl). Each line is one example. Use one format consistently. Min 10 examples.
        </p>
        <div className="mt-4">
          <CodeOutput title="dataset.jsonl" code={datasetFormatSnippet} />
        </div>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Create task</h2>
        <CodeOutput title="Terminal" code={createTaskSnippet} />
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Monitor & download</h2>
        <CodeOutput title="Terminal" code={monitorSnippet} />
        <p className="mt-2 text-xs text-amber-300/90">
          Download within 48h of Delivered. Then decrypt when status = Finished (~1 min after acknowledge).
        </p>
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Decrypt model</h2>
        <CodeOutput title="Terminal" code={decryptSnippet} />
      </section>

      <section>
        <h2 className="mb-3 text-lg font-semibold">Where this goes</h2>
        <div className="space-y-4">
          <PlacementGuide
            filePath="config.json"
            description="Training config. Use the template—only modify values."
            code={configSnippet}
          />
          <PlacementGuide
            title="dataset.jsonl"
            filePath="dataset.jsonl"
            description="One JSON object per line. Instruction-input-output, chat messages, or text."
            code={datasetFormatSnippet}
          />
        </div>
      </section>

      <AddToProjectSteps steps={addToProjectSteps} />

      <section className="glass-card rounded-2xl p-5">
        <h3 className="text-lg font-semibold text-white/90">Python requirements</h3>
        <CodeOutput title="pip install" code={pipRequirementsSnippet} />
      </section>

      <ConfigPanel
        title="Python inference (base model)"
        fields={[
          {
            id: "modelChoice",
            label: "Base model",
            type: "select",
            value: modelChoice,
            onChange: setModelChoice,
            options: [
              { value: "qwen-small", label: "Qwen2.5-0.5B-Instruct (~1GB)" },
              { value: "qwen-large", label: "Qwen3-32B (~65GB, 40GB+ VRAM)" },
            ],
          },
        ]}
      />

      <WorkedExample title="Python: Load LoRA and run inference" code={pythonInferenceSnippet} />

      <section className="glass-card rounded-2xl p-5">
        <h3 className="text-lg font-semibold text-white/90">Other commands</h3>
        <div className="mt-4 space-y-3 text-sm">
          <div>
            <p className="font-medium text-white/90">Upload dataset separately</p>
            <CodeOutput title="Terminal" code="0g-compute-cli fine-tuning upload --data-path <PATH>" />
          </div>
          <div>
            <p className="font-medium text-white/90">List tasks</p>
            <CodeOutput title="Terminal" code="0g-compute-cli fine-tuning list-tasks --provider <PROVIDER_ADDRESS>" />
          </div>
          <div>
            <p className="font-medium text-white/90">Cancel task (before it runs)</p>
            <CodeOutput title="Terminal" code="0g-compute-cli fine-tuning cancel-task --provider <PROVIDER_ADDRESS> --task <TASK_ID>" />
          </div>
          <div>
            <p className="font-medium text-white/90">Model usage template (custom provider models)</p>
            <CodeOutput title="Terminal" code="0g-compute-cli fine-tuning model-usage --provider <PROVIDER> --model <MODEL> --output <PATH>" />
          </div>
        </div>
      </section>
    </div>
  );
}
