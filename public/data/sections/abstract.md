**Abstract** — The broadcast nature of wireless channels exposes radio-frequency (RF) networks to anomalous and malicious transmissions, making anomaly detection a fundamental requirement for secure spectrum management. Quantum Kitchen Sinks (QKS) offer a lightweight hybrid quantum feature map suitable for near-term quantum devices, yet their behavior on structured signal data remains poorly understood.

In this paper, we extend the standard QKS template with multi-depth data re-uploading and ring entanglement, and evaluate the resulting pipeline on controlled RF spectrogram anomaly detection. We introduce a validation-locked five-stage ablation protocol that systematically separates the effects of shallow architecture, re-uploading depth, episode budget, input representation, and classical readout.

Across the completed benchmark, **Discrete Cosine Transform (DCT) representations consistently dominate raw and Principal Component Analysis (PCA) inputs**, moderate-depth entangled QKS configurations form the strongest operating regime, and QKS improves over matched classical direct-readout baselines across all evaluated representation-readout pairs on the held-out test set, with the best configuration reaching:

| Metric | Value |
|--------|-------|
| Test AUROC | **0.8778** |
| Test F1 | **0.7995** |
| Training samples | 21,600 |
| Test samples | 8,124 |

The study bridges two levels of realism: real measured sub-6 GHz cellular signals on the data side and real-device validation on the **ibm_quebec** Quantum Processing Unit (QPU) on the computing side, with AUROC deviations below **0.013** relative to simulation. These results provide a practical, reproducible framework for deploying QKS-based anomaly detection in wireless networks.

**Keywords**: Quantum machine learning, Quantum Kitchen Sinks, anomaly detection, RF spectrograms, hybrid quantum-classical models
