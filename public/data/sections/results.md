## 3. Experiments & Results

### A. Dataset Generation

#### Data Sources
- **LTE Measurements**: Real sub-6 GHz cellular signals captured across multiple LTE frequency bands
- **Anomalous Signals**: Synthetically generated using Python-based simulations
- **Signal Types**:
  - **Chirp Signal**: Unauthorized transmission (unauthorized signal)
  - **Barrage Jamming**: Wideband interference across entire bandwidth
  - **Frequency Hopping Jamming**: Time-varying partial-band interference

#### Dataset Statistics
| Parameter | Value |
|-----------|-------|
| Training Signals (unique) | 10,800 |
| Test Signals (unique) | 4,062 |
| Total Training Samples | 21,600 |
| Total Test Samples | 8,124 |
| Sampling Frequency | 61.44 MHz |
| IQ Points per Signal | 1,300,000 |
| Time Duration | 21.15 ms |
| Bandwidth | 48 MHz |
| Spectrogram Size | 400 × 400 |
| Jamming-to-Signal Ratios (dB) | [-10, -8, -6, -4, -2, 0, 2, 5] |

#### Dataset Generation Workflow
1. **Base Signal**: Real LTE transmission from dataset [22]
2. **Anomalous Injection**: One of three interference types superimposed
3. **Signal Properties**:
   - Temporal duration: randomly selected within 21.15 ms
   - Frequency location: randomly distributed within 48 MHz band
   - JSR (Jamming-to-Signal Ratio): varies across specified dB range

#### Spectrogram Processing
- **Transformation**: Short-Time Fourier Transform (STFT)
- **STFT Parameters**: Hann window, 3250 hop size, 8192 FFT size
- **Overlap Ratio**: 25%
- **Downsampling**: 400 × 400 resolution
- **Output**: Time–frequency representation

#### Anomalous Pattern Characteristics
- **Normal Spectrogram**: Structured, energy confined to specific frequency bands
- **Chirp Signal**: Diagonal trace pattern (unauthorized transmission)
- **Barrage Jamming**: Wideband, dense energy distribution across 48 MHz
- **Frequency Hopping**: Intermittent bursts, rapidly shifting across subbands

### B. Performance Evaluation

**Configuration Space**:
- **Qubits (n)**: 2, 4, 6, 8, 10
- **Episodes (E)**: 8, 16, 32, 64, 128, 256
- **Depth (D)**: 1, 2, 4, 6, 8, 10
- **Entanglement**: Enabled/Disabled
- **Representations**:
  - **DCT Variants**: 16×16, 64×64, 128×128, 256×256
  - **PCA Variants**: m = 32, 128, 256, 512, 2048
  - **Raw**: Full 400×400 flattened

#### Stage 1 Results: Shallow Architecture Search

**Best Performer**: 10-qubit, 256-episode, entangled configuration

| Metric | Value |
|--------|-------|
| Validation AUROC | 0.828 |
| Validation F1 | 0.749 |

**Alternative**: 8-qubit, 64-episode unentangled configuration
- AUROC: 0.826 | F1: 0.729

#### Stage 2 Results: Depth Sweep

**Best Performer**: 10-qubit, 256-episode, depth 4, entangled
- **AUROC**: 0.8502 | **F1**: 0.7718
- **Depth Impact**: Non-monotonic - distinct improvements at depth 2–4, decline at depth 8

#### Stage 4 Results: Representation Comparison

**Advancing Representations** (to Stage 5):
1. **dct128x128**: 10 qubits, 64 episodes, depth 4, entangled
2. **dct64x64**: 10 qubits, 64 episodes, depth 4, entangled
3. **dct256x256**: 10 qubits, 128 episodes, depth 2, entangled

**Key Observation**: **DCT dominates** all other representation families:
- **Best non-DCT contender** (pca32): 0.5262 AUROC (well below 0.854 cutoff)
- No raw or PCA representation advanced to Stage 5

#### Stage 5 Results: Final Benchmark

**Test Performance - Linear Readout Family**:

| Representation | Readout | Test AUROC | Test F1 | ΔAUROC | ΔF1 |
|----------------|---------|------------|----------|--------|-----|
| dct64x64 | LinearSvm | 0.8778 | 0.7938 | +0.1839 | +0.1423 |
| dct64x64 | LinearLogistic | 0.8717 | 0.7995 | +0.1451 | +0.1389 |
| dct128x128 | LinearSvm | 0.8763 | 0.7969 | +0.1818 | +0.1451 |
| dct128x128 | LinearLogistic | 0.8705 | 0.7978 | +0.1411 | +0.1363 |
| dct256x256 | LinearSvm | 0.8576 | 0.7754 | +0.1601 | +0.1195 |
| dct256x256 | LinearLogistic | 0.8264 | 0.7739 | +0.0952 | +0.1104 |

**Critical Findings**:
1. **All 15 comparisons show QKS outperforms** direct-readout baselines
2. **Largest gain**: dct64x64 + LinearSvm (AUROC +0.1839, F1 +0.1423)
3. **Smallest gain**: dct256x256 + LinearLogistic (AUROC +0.0952, F1 +0.1104)
4. **Best overall**: dct64x64 + LinearSvm (AUROC 0.8778, F1 0.7938)

### C. Hardware Validation Results

**Real QPU Configuration**: 4 qubits, single-layer depth, 32 episodes, O_n^Z,ZZ observables

| Readout Family | Hardware AUROC | Hardware F1 | Sim AUROC | Sim F1 | ΔAUROC | ΔF1 |
|----------------|----------------|-------------|-----------|--------|--------|-----|
| LinearSvm | 0.7383 | 0.6051 | 0.7312 | 0.6578 | +0.0071 | -0.0527 |
| LinearLogistic | 0.7208 | 0.6589 | 0.7336 | 0.6452 | -0.0128 | +0.0137 |
| RffLinearSvm | 0.8074 | 0.7199 | 0.8058 | 0.7048 | +0.0016 | +0.0151 |
| RffLogistic | 0.8032 | 0.7370 | 0.8059 | 0.7022 | -0.0027 | +0.0347 |
| NystroemLogistic | 0.8136 | 0.7482 | 0.8155 | 0.7164 | -0.0019 | +0.0318 |

**Hardware-QPU Summary**:
- **All readouts perform within 1.28% AUROC** of simulated performance
- **Hardware metrics remain close to simulation**: ΔAUROC ∈ [-0.0128, +0.0171]
- **Hardware ranking consistent**: NystroemLogistic remains best performer (0.8136 AUROC)
- **Feature quality largely preserved**: effective quantum feature map behaves similarly in real device

### D. Key Insights

#### 1. Multi-depth QKS as Representation Enhancer
- **QKS gains systematically** across all representation-readout combinations
- **Largest improvements**: Linear readouts (AUROC +0.0952 to +0.1839)
- **Moderation**: Non-kernel readouts show largest improvements; smaller gains for nonlinear readouts
- **Interpretation**: QKS acts as **representation enhancer**, not universal superior alternative

#### 2. Representation-Specific Performance
- **DCT dominance**: Only DCT variants advance to final stage
- **Raw vs. PCA limitations**: Both significantly underperform DCT-based approaches
- **Structural preservation**: DCT captures time–frequency plane organization better than PCA or raw inputs

#### 3. Depth-Episode Trade-off
- **Optimal configuration**: Depth 4, Episodes 64 (for entangled 10-qubit)
- **Depth effects**: Non-monotonic - improves performance up to depth 4, then declines
- **Entanglement benefit**: Significant improvement when combined with moderate depth

#### 4. Hardware Robustness
- **Real-QPU validation**: Feature map geometry preserved under real-device execution
- **Minimal performance deviation**: All readouts within 0.013 AUROC of simulation
- **Consistent ranking**: Hardware maintains same performance ordering as simulation
