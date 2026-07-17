## 3. Experiments & Results

### A. QKS Pipeline & Ablation Protocol

We evaluate the QKS pipeline on a controlled RF spectrogram anomaly detection task. To systematically separate the effects of shallow architecture, re-uploading depth, episode budget, input representation, and classical readout, we introduce a **validation-locked, leakage-free five-stage ablation protocol**. The original test set remains untouched until the final stage.

#### Input Representations

Let $x \in \mathbb{R}^{400 \times 400}$ denote an RF spectrogram. The QKS pipeline operates on a vector representation $r(x) \in \mathbb{R}^d$ constructed from $x$. We consider three representation families:

**Raw Representation:**
$$r_{\text{raw}}(x) = \text{vec}(x)$$

**DCT Representation:**
$$r_{\text{DCT}}(x) = \text{vec}\left(C_{1:k_f, 1:k_t}(x)\right)$$

**PCA Representation:**
$$r_{\text{PCA}}(x) = P_m \text{vec}(x)$$

where $\text{vec}(\cdot)$ flattens a matrix into a vector, $C_{1:k_f, 1:k_t}(x)$ denotes the upper-left $k_f \times k_t$ coefficient block of the 2-D DCT (type II, orthonormal normalization), and $P_m$ denotes the projection onto the first $m$ principal directions learned from the training set.

In the benchmark, we use $k_f \times k_t \in \{16 \times 16, 64 \times 64, 128 \times 128, 256 \times 256\}$ for DCT, and $m \in \{32, 128, 256, 512, 2048\}$ for PCA.

#### Multi-depth QKS Featurizer

Given a representation vector $r(x) \in \mathbb{R}^d$, the QKS featurizer constructs one quantum feature block per episode. For each episode $e \in \{1, \ldots, E\}$ and layer $\ell \in \{1, \ldots, D\}$, the model samples two affine maps:

$$\phi_{X}^{(e,\ell)}(x) = W_{X}^{(e,\ell)} r(x) + b_{X}^{(e,\ell)}$$
$$\phi_{Y}^{(e,\ell)}(x) = W_{Y}^{(e,\ell)} r(x) + b_{Y}^{(e,\ell)}$$

where $W_{X}^{(e,\ell)}, W_{Y}^{(e,\ell)} \in \mathbb{R}^{n \times d}$ and $b_{X}^{(e,\ell)}, b_{Y}^{(e,\ell)} \in \mathbb{R}^n$. Each entry is sampled i.i.d. from $\mathcal{N}(0, \sigma^2)$ with $\sigma = 2$ for weights, and from $\mathcal{U}([0, 2\pi])$ for biases.

The single-layer data-upload operator is:

$$U_{e,\ell}(x) = \prod_{j=0}^{n-1} RY\left(\phi_{Y,j}^{(e,\ell)}(x)\right) RX\left(\phi_{X,j}^{(e,\ell)}(x)\right)$$

Let $V_{\text{ring}}$ be the identity (when entanglement is disabled) or the controlled-Z (CZ) ring $(0,1), (1,2), \ldots, (n-2,n-1), (n-1,0)$ (otherwise). For episode $e$:

$$|\psi_e(x)\rangle = U_e(x)|0\rangle^{\otimes n}$$

where:

$$U_e(x) = U_{e,D}(x) V_{\text{ring}} \cdots U_{e,2}(x) V_{\text{ring}} U_{e,1}(x)$$

The observable family is the set of all single-qubit and two-qubit Pauli observables:

$$\mathcal{O}_n = \bigcup_{0 \leq i < n, a \in \{X,Y,Z\}} \{\sigma_a^{(i)}\} \cup \bigcup_{0 \leq i < j < n, a,b \in \{X,Y,Z\}} \{\sigma_a^{(i)} \sigma_b^{(j)}\}$$

Thus $|\mathcal{O}_n| = 9\binom{n}{2} + 3n$. The per-episode feature block is:

$$\xi_e(x) = \left[\langle \psi_e(x)|O|\psi_e(x)\rangle\right]_{O \in \mathcal{O}_n} \in \mathbb{R}^{|\mathcal{O}_n|}$$

The final QKS feature vector is:

$$\xi(x) = [\xi_1(x)^\top, \ldots, \xi_E(x)^\top]^\top \in \mathbb{R}^{E|\mathcal{O}_n|}$$

#### Five-Stage Ablation Protocol

The benchmark disentangles architecture, depth, depth-episode allocation, input representation, and final readout layer, while keeping the original test set untouched until the final stage. Stages 1–4 operate on a fixed model-selection subset and a disjoint validation subset drawn from the original training split. Stage 5 retrains finalists on the full original training split and evaluates them once on the untouched original test split.

| Stage | Focus | Configurations |
|-------|-------|----------------|
| 1 | Shallow architecture search | $n \in \{2,4,6,8,10\}$, $E \in \{8,16,32,64,128,256\}$, entanglement on/off |
| 2 | Depth scan | $D \in \{1,2,4,6,8,10\}$ on top-4 Stage 1 configs |
| 3 | Depth-episode trade-off | $(D,E) \in \{(1,256),(2,128),(4,64),(8,32)\}$ with $D \times E = 256$ |
| 4 | Representation comparison | Raw, 4 DCT variants, 5 PCA variants on top Stage 3 candidates |
| 5 | Final full-dataset benchmark | 5 readout families on held-out test set |

In Stages 1–4, we deliberately use a single fast Linear SVM readout so that model selection focuses on the quality of the quantum feature map itself. In Stage 5, we compare five matched readout families: Linear SVM, Logistic Regression, Random Fourier Features (RFF), and Nyström.

---

### B. Ablation Study Results

#### Stage 1: Shallow Architecture Search

On the fixed $64 \times 64$ DCT representation with $D=1$, the best shallow model uses 10 qubits, 256 episodes, depth 1, and entanglement, reaching validation AUROC of **0.828** and validation F1 of **0.749**. The second-best alternative is an 8-qubit, 64-episode non-entangled configuration (0.826 AUROC, 0.729 F1).

Entangled configurations concentrate in a relatively compact high-performance region, while non-entangled configurations exhibit a flatter, less structured landscape with more sporadic improvements. This indicates that increasing the size of the random feature map does not necessarily translate to better performance; moderate configurations are sufficient to capture most of the discriminative structure.

#### Stage 2: Depth Scan

Depth substantially improves performance once a strong shallow backbone is identified. The best Stage 2 model uses 10 qubits, 256 episodes, depth 4, and entanglement, reaching **0.8502** validation AUROC and **0.7718** validation F1. Moving from depth 1 to depth 4 improves validation AUROC from 0.8282 to 0.8502 and validation F1 from 0.7494 to 0.7718.

Depth trends are non-monotonic across the four shortlisted backbones: each curve improves after adding some re-uploading, but the strongest entangled $q=10, E=256$ configuration peaks at depth 4 and then degrades. This behavior is consistent with repeated data re-uploading: it enriches nonlinear feature mapping within moderate depths, after which additional layers increasingly randomize or dilute task-relevant structure relative to the fixed linear readout.

Entanglement consistently appears in the strongest configurations, indicating that inter-qubit interactions provide useful additional structure beyond independent single-qubit transformations.

#### Stage 3: Depth-Episode Trade-off

Stage 3 introduces a fixed-budget comparison where the nominal product $D \times E = 256$ is held constant while the budget is reallocated between circuit depth and episode count. The strongest candidate is the 10-qubit, 64-episode, depth 4 model with validation AUROC of **0.8482** and validation F1 of **0.7649**. The 10-qubit, 128-episode, depth 2 alternative is competitive at 0.8397 AUROC and 0.7531 F1, while the shallow $(D,E)=(1,256)$ and deep $(D,E)=(8,32)$ endpoints are weaker.

#### Stage 4: Representation Comparison

When the two strongest Stage 3 QKS candidates are evaluated across all ten input representations, the DCT family clearly dominates. The three strongest advancing representations are `dct128x128`, `dct64x64`, and `dct256x256`; their best QKS configurations all stay in the entangled 10-qubit regime. The best non-DCT contender, `pca32`, reaches only **0.5262** validation AUROC, far below the DCT advancement threshold.

This result does not support representation-agnostic QKS gains; instead, it identifies a DCT-dominated regime where structurally preserved classical preprocessing remains an effective part of the hybrid model. The DCT advantage is consistent with the idea that anomaly signatures are organized on the time-frequency plane, and are therefore better preserved by low-index DCT coefficients than by raw flattened inputs or PCA directions learned from global variance.

---

### C. Final Full-Dataset Benchmark

Stage 5 retrains the Stage 4 finalists on the full original training split and evaluates them once on the held-out original test split. Among 15 final representation-readout comparisons, the highest test AUROC of **0.8778** (test F1: 0.7938) is achieved by `dct64x64 + LinearSvm`. The highest test F1 of **0.0.7995** (test AUROC: 0.8716) is achieved by `dct64x64 + LinearLogistic`.

Three key patterns emerge:

1. **Systematic QKS improvement**: All 15 rows place the QKS pipeline above its matched direct-readout baseline. The observed AUROC gains are systematic across all evaluated representation-readout pairs, indicating that QKS mapping consistently reshapes shortlisted DCT inputs into a more discriminative geometry than the matched direct-readout pipeline.

2. **Largest gains at linear readout**: Reported $\Delta$AUROC and $\Delta$F1 (quantifying the difference between QKS and direct-readout baseline scores) show maximum gains at linear readout. Among the six linear rows, AUROC gains range from +0.0952 to +0.1839, with the largest gap achieved by `dct64x64 + LinearSvm`. Approximate kernel readouts also improve, but their AUROC gains are noticeably smaller. This indicates that most of the benefit is already realized at the level of linear separability, leaving less residual structure for the approximate kernel head to recover.

3. **QKS as a representation enhancer**: The fact that the strongest gains appear at the simplest linear readout indicates that QKS mapping makes the shortlisted DCT representation more linearly separable on the test split, rather than merely adding redundancy that only richer nonlinear heads can exploit.

### D. Real Quantum Hardware Validation

To assess the realism of the computing side, we conducted a concentrated validation on real quantum hardware. Due to the cost of real-device execution, all hardware experiments used a 4-qubit entangled feature map, single-layer depth ($D=1$), and 32 episodes, with each circuit's expectation values estimated from 4096 samples. Experiments ran from March 25–29, 2026, on the **ibm_quebec** QPU, using the `dct128x128` representation.

Compared to the full simulation study, the measured observable family was restricted to all single-qubit $Z$ observables and pairwise $ZZ$ observables:

$$\mathcal{O}_n^{(Z,ZZ)} = \{\sigma_Z^{(i)}\}_{i=0}^{n-1} \cup \{\sigma_Z^{(i)} \sigma_Z^{(j)}\}_{0 \leq i < j < n}$$

Thus $|\mathcal{O}_n^{(Z,ZZ)}| = \frac{n(n+1)}{2}$, instead of the full single- and two-qubit Pauli family used in simulation. Additionally, the dataset size was reduced to approximately 10% of the original training and test sets. The search space was deliberately constrained to stay within the available quantum budget and to limit the practical overhead associated with queue times and repeated hardware calls. Therefore, this experiment is not intended to reproduce the full simulation study, but rather to assess whether the learned representation retains meaningful predictive structure when executed on a real superconducting quantum processor.

| Readout | Sim AUROC | QPU AUROC | $\Delta_{HS}^{AUROC}$ | Sim F1 | QPU F1 | $\Delta_{HS}^{F1}$ |
|---------|-----------|-----------|----------------------|--------|--------|---------------------|
| LinearSvm | 0.8485 | 0.8352 | $-1.281 \times 10^{-2}$ | 0.7503 | 0.7241 | $-2.617 \times 10^{-2}$ |
| LinearLogistic | 0.8419 | 0.8432 | $+1.289 \times 10^{-3}$ | 0.7558 | 0.7421 | $-1.371 \times 10^{-2}$ |
| RffSvm | 0.8224 | 0.8266 | $+4.246 \times 10^{-3}$ | 0.7232 | 0.7299 | $+6.738 \times 10^{-3}$ |
| NystroemSvm | 0.8147 | 0.8198 | $+5.126 \times 10^{-3}$ | 0.7045 | 0.7024 | $-2.097 \times 10^{-3}$ |
| NystroemLogistic | 0.8155 | 0.8136 | $-1.842 \times 10^{-3}$ | 0.7164 | 0.7482 | $+3.186 \times 10^{-2}$ |

Overall, real-hardware results remain close to their simulation counterparts, with all test readouts exhibiting only minor deviations in AUROC. The observed AUROC gaps range from $-1.281 \times 10^{-2}$ to $+7.132 \times 10^{-3}$, indicating that the ranking quality of QKS features is largely preserved under real-device execution despite the reduced measurement setting. The **NystroemLogistic** readout achieves the best real-QPU performance with AUROC of **0.8136** and F1 of **0.7482**.

These results indicate that, within this deliberately reduced experimental setup, the proposed pipeline remains robust to real-device execution and retains most of the predictive structure observed in simulation.
