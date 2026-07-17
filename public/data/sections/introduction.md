## 1. Introduction

Spectrum sharing is a fundamental concept in cognitive radio systems, enabling multiple heterogeneous networks to coexist while efficiently utilizing shared radio-frequency (RF) spectrum resources that are inherently limited [1]. This paradigm relies on the open and dynamic nature of the radio spectrum, where wireless transmission propagates over inherently shared channels [2]. However, this openness inherently exposes wireless environments to a wide range of disruptions, including both unintentional disturbances and deliberate attacks such as unauthorized transmissions and malicious interference [3].

Common examples of these adversarial actions include **jamming, sniffing, spoofing**, and the injection of anomalous signals [4]. Among these threats, jamming attacks are especially harmful, as adversaries intentionally transmit disruptive signals to interfere with legitimate communications and distort observed spectrum activity [5]. Such interference reduces the signal-to-interference-plus-noise ratio (SINR), resulting in higher error rates, degraded communication quality, and possible system blockage [6].

Anomaly detection techniques aim to identify both known and unknown interference by detecting deviations from normal signal behavior [8]. Early conventional methods, such as energy detection, cyclostationarity, and matched filtering [9], rely heavily on expert knowledge. Recent works leverage machine learning (ML) on spectrogram datasets for jamming detection [10], using supervised approaches with labeled data [11], [12] and unsupervised methods such as autoencoders and prediction-based models [13], [14], deep Convolutional Neural Networks (CNN) [15], as well as Generative Adversarial Network (GAN)-based frameworks [16].

**Quantum Machine Learning (QML)** has emerged at the interface of quantum computing and classical ML, with the goal of exploring whether quantum information processing can enhance the efficiency or performance of learning models [17]. Building on this perspective, QML has also attracted growing interest for anomaly detection in wireless systems, where high-dimensional signal representations and complex interference patterns make efficient feature extraction particularly important [18].

In particular, **Quantum Kitchen Sinks (QKS)** adapt the classical random kitchen sinks framework of explicit randomized feature maps to quantum circuits, thereby producing finite-dimensional quantum features that can be processed by lightweight classical readouts [19]. QKS is especially attractive for near-term noisy intermediate-scale quantum (NISQ) devices because the quantum circuit acts as a randomized feature generator rather than a fully trainable variational model, while the optimization burden is shifted to a simple classical head [19], [20].

### Contributions

1. We construct a labeled spectrogram dataset combining real sub-6 GHz cellular signals with synthetically generated anomalous signals spanning three interference types.
2. We extend the standard QKS template with **multi-depth data re-uploading and ring entanglement**, preserving a lightweight classical readout stage.
3. We introduce a **validation-locked, leakage-free five-stage ablation protocol** that separates shallow architecture, depth, episode budget, input representation, and readout effects without touching the test split until the final stage.
4. DCT representations unlock strong QKS performance, with multi-depth QKS consistently improving over matched baselines across all evaluated readouts on the held-out test set.
5. Our study bridges two levels of realism by relying on real measured data and by validating the pipeline on the **ibm_quebec** QPU, showing AUROC deviations below **0.013** relative to simulation.

### References

[1] X. Jiang et al., "Intelligent Jamming Strategies for Secure Spectrum Sharing Systems," *IEEE Trans. Commun.*, vol. 70, no. 2, pp. 1153–1167, 2022.

[2] Y. Zou et al., "A Survey on Wireless Security: Technical Challenges, Recent Advances, and Future Trends," *Proc. IEEE*, vol. 104, no. 9, pp. 1727–1765, 2016.

[3] A. S. Ali et al., "RF Jamming Dataset: A Wireless Spectral Scan Approach for Malicious Interference Detection," *IEEE Commun. Mag.*, vol. 62, no. 11, pp. 114–120, 2024.

[4] M. Lichtman et al., "LTE/LTE-A Jamming, Spoofing, and Sniffing: Threat Assessment and Mitigation," *IEEE Commun. Mag.*, vol. 54, no. 4, pp. 54–61, 2016.
