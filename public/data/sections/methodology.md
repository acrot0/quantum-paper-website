## 2. Methodology

### A. Input Representations

Let x ∈ R^{400×400} denote an RF spectrogram. The QKS pipeline does not operate directly on this matrix, but rather on a vector representation r(x) ∈ R^{d} constructed from it. In this study, we consider three representation families:

#### 1. Raw Representation (r_raw)

r_raw(x) = vec(x),

where vec(·) flattens its matrix argument into a vector. The raw representation retains the full 400×400 spectrogram and flattens it into a vector in R^{160000}.

#### 2. Discrete Cosine Transform Representation (r_DCT)

r_DCT(x) = vec(C_{k_f × k_t}(x)),

where C_{k_f × k_t}(x) denotes the upper-left k_f × k_t coefficient block of the 2-D DCT (type II, with orthonormal normalization) of x, and vec(·) flattens that block. The retained block corresponds to **low-index DCT coefficients** capturing coarse, slowly varying structure over the 2-D spectrogram array along both the frequency-bin axis and the time-bin axis.

In the benchmark, we use k_f × k_t ∈ {16 × 16, 64 × 64, 128 × 128, 256 × 256}.

#### 3. Principal Component Analysis Representation (r_PCA)

r_PCA(x) = P_m vec(x),

where P_m denotes the projection onto the first m principal directions learned from the training set. The PCA family first flattens the spectrogram and then projects it onto an m-dimensional linear subspace, with m ∈ {32, 128, 256, 512, 2048}.

**Distinction**: DCT is a fixed transform that explicitly preserves coarse 2-D spectrogram structure, while PCA is a learned linear projection applied to flattened spectrograms and preserves high-variance directions without maintaining the original grid structure in the same explicit way.

### B. Multi-depth QKS Featurizer

Given a representation vector r(x) ∈ R^{d}, the QKS featurizer constructs one quantum feature block per episode. In line with the original QKS, multiple episodes are used to map the same input to different randomized quantum states, and each such per-episode state is measured through a fixed observable family to produce a corresponding per-episode feature block.

For each episode e ∈ {1, ..., E} and layer ℓ ∈ {1, ..., D}, the model samples two affine maps from the representation space to the n input-dependent circuit angles:

ϕ_{e,ℓ}^X(x) = w_{e,ℓ}^X · r(x) + b_{e,ℓ}^X,

ϕ_{e,ℓ}^Y(x) = w_{e,ℓ}^Y · r(x) + b_{e,ℓ}^Y,

where w_{e,ℓ}^X, w_{e,ℓ}^Y ∈ R^{n×d} and b_{e,ℓ}^X, b_{e,ℓ}^Y ∈ R^{n}. Equiv- alently, for each qubit j ∈ {0, ..., n-1}:

ϕ_{e,ℓ}^X,j(x) = ⟨w_{e,ℓ}^X,j, r(x)⟩ + b_{e,ℓ}^X,j,

ϕ_{e,ℓ}^Y,j(x) = ⟨w_{e,ℓ}^Y,j, r(x)⟩ + b_{e,ℓ}^Y,j,

In the completed benchmark, every entry of w_{e,ℓ}^X and w_{e,ℓ}^Y is sampled i.i.d. from N(0, σ²) with σ = 2, and every entry of b_{e,ℓ}^X and b_{e,ℓ}^Y is sampled i.i.d. from U([0, 2π]).

These angle vectors parameterize a layered circuit template. We define the single-layer data-upload operator as:

U_{e,ℓ}(x) = Y_{j=0}^{n-1} RY(ϕ_{e,ℓ}^Y,j(x)) · RX(ϕ_{e,ℓ}^X,j(x)),

and we denote by V_ring either the identity (when entanglement is disabled) or the fixed controlled-Z (CZ) ring (0,1), (1,2), ..., (n-2,n-1), (n-1,0) otherwise. For episode e, the input state |0⟩^{⊗n} is mapped to:

|ψ_e(x)⟩ = U_e(x)|0⟩^{⊗n},

where U_e(x) = U_{e,D}(x) · V_ring · ... · U_{e,2}(x) · V_ring · U_{e,1}(x).

**Key Insight**: Each episode re-uploads the same classical representation across multiple randomized layers, while entanglement, when enabled, is inserted only between consecutive upload layers, preserving a lightweight per-layer circuit structure while allowing the effective quantum feature map to become richer as depth increases.

### C. Observable Family

In our method, the measured observable family is taken to consist of all one- and two-body Pauli observables:

O_n^Z,ZZ = {σ_a^(i) : 0 ≤ i < n, a ∈ {X, Y, Z}} ∪ {σ_a^(i)σ_b^(j) : 0 ≤ i < j < n, a, b ∈ {X, Y, Z}},

so that |O_n^Z,ZZ| = 9n^2/2, where the factor 9 comes from the 3×3 possible choices of (a,b) ∈ {X,Y,Z} for each qubit pair (i,j). This observable family captures both single-qubit statistics and pairwise correlations induced by the feature map, while remaining polynomial in n. The per-episode feature block is therefore:

ξ_e(x) = ½⟨ψ_e(x) | O | ψ_e(x)⟩ ∈ R^{|O_n^Z,ZZ|},

and the final QKS feature vector is obtained by concatenating all per-episode feature blocks as follows:

ξ(x) = [ξ_1(x)^T, ..., ξ_E(x)^T]^T ∈ R^{E|O_n^Z,ZZ|}.

### D. Five-stage Protocol

The benchmark is designed to disentangle the effects of architecture, depth, depth–episode allocation, input representation, and classical readout, while keeping the raw test split untouched until the final evaluation. Stages 1–4 operate only on a fixed model-selection subset drawn from the raw training split together with a disjoint validation subset. Stage 5 retrains the finalists on the full raw training split and evaluates them once on the untouched raw test split.

**a) Readouts**: During Stages 1–4, we deliberately use a single fast linear Support Vector Machine (SVM) readout so that model selection remains focused on the quality of the quantum feature map itself, rather than being confounded by a broader comparison of downstream classifiers. In Stage 5, we then compare alternative corresponding readout families, as they probe different aspects of the same QKS feature geometry, and evaluate their performance under a matched setting. Specific readouts include linear SVM, logistic regression, Random Fourier Features (RFF), and Nyström lifts.

**b) Protocol Overview**:

1) **Stage 1**: Shallow architecture search. Fix representation to 64×64 DCT, depth to D = 1, and sweep n ∈ {2, 4, 6, 8, 10} qubits, E ∈ {8, 16, 32, 64, 128, 256} episodes, and entanglement on/off.

2) **Stage 2**: Depth sweep. Take top four Stage 1 configurations and sweep depth D ∈ {1, 2, 4, 6, 8, 10} while keeping Stage 1 hyperparameters fixed.

3) **Stage 3**: Matched depth–episode trade-off. Replace the Stage 2 winner's (D,E) pair with (1,256), (2,128), (4,64), (8,32) for direct comparison.

4) **Stage 4**: Representation comparison. Evaluate the two strongest Stage 3 candidates across ten input representations: raw input, four DCT variants, and five PCA variants.

5) **Stage 5**: Final full dataset benchmark. Compare matched direct-readout baselines and QKS models across the same five readout families on the full training split, report results on held-out test data.
