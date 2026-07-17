## 5. Discussion and Limitations

### A. Key Findings Summary

#### 1. Multi-depth QKS as a Representation Enhancer
- **Systematic improvement**: All 15 representation-readout combinations show QKS outperforms direct-readout baselines
- **Linear readout dominance**: Largest gains (+0.0952 to +0.1839 AUROC) observed with linear classifiers (SVM, Logistic)
- **Nonlinear limitation**: Smaller improvements for approximate-kernel readouts (RFF, Nyström)
- **Interpretation**: QKS acts primarily as a **representation enhancer** whose value is most pronounced with simple downstream classifiers

#### 2. Representation-Dependent Performance
- **DCT superiority**: Only DCT variants (16×16, 64×64, 128×128, 256×256) advanced to Stage 5
- **Raw/PCA inadequacy**: Significantly underperform DCT-based approaches (0.5262 vs. 0.8778 AUROC)
- **Structural explanation**: DCT preserves time–frequency plane organization while PCA emphasizes high-variance directions

#### 3. Depth-Episode Trade-off
- **Optimal regime**: Depth 4 with Episodes 64 for entangled 10-qubit configuration
- **Non-monotonic behavior**: Improvements up to depth 4, declines beyond
- **Entanglement synergy**: Positive interaction with moderate depth configurations

#### 4. Hardware Validation
- **Robustness confirmed**: Real ibm_quebec QPU performance closely matches simulation
- **Small deviations**: Within 0.013 AUROC across all readout families
- **Consistent ranking**: Hardware preserves linear ordering of classifiers

### B. Technical Interpretation

#### B.1 Feature Map Design Decisions
The QKS pipeline's success suggests that **structured randomization** of quantum features, combined with **controlled depth**, produces discriminative representations for RF anomaly detection. Unlike fully trainable variational circuits, the fixed randomization approach:

- **Reduces training complexity**: No gradient optimization needed during feature extraction
- **Enables straightforward ablation**: Each component can be systematically evaluated
- **Provides reproducible framework**: Fixed hyperparameters facilitate comparison across studies

#### B.2 Depth vs. Episode Strategy
The matched depth–episode comparison (Stage 3) reveals that **moderate re-uploading depth (D=4) with balanced episode count (E=64)** yields optimal performance. This suggests:

- **Sufficient expressivity**: 4 upload layers provide enough nonlinearity for discrimination
- **Stable ensemble**: 64 episodes provide adequate averaging while maintaining computational feasibility
- **Interaction with entanglement**: Entangled configurations consistently outperform unentangled counterparts

#### B.3 Input Representation Criticality
The results highlight that **quantum feature extraction alone is insufficient**; the quality of the **classical input representation** fundamentally determines final performance. This indicates:

- **Two-stage improvement pipeline**: Classical preprocessing (DCT) + quantum enhancement (QKS)
- **Structure preservation**: DCT's ability to capture time–frequency plane organization is crucial
- **Task-specific value**: Quantum advantage manifests in domains where structured preprocessing is complementary

### C. Limitations

#### 1. Task-Specific Evidence
- **Controlled dataset**: Generated anomalies rather than diverse real-world scenarios
- **Generalization untested**: Performance on unseen interference types and spectrum conditions unknown
- **Single run analysis**: No broad seed ensemble for hyperparameter stability assessment

#### 2. Technical Constraints
- **Classical readout limitation**: Restricted to fast linear and approximate-kernel probes
- **Hardware resource constraints**: Experiment limited to 4-qubit configuration
- **Observational family reduction**: Focused on Z,ZZ observables rather than full Pauli family

#### 3. Experimental Constraints
- **No full hyperparameter search**: Limited to 138 evaluations due to computational budget
- **Linear readouts dominance**: Unknown whether stronger classical heads reduce QKS gains

### D. Future Research Directions

#### 1. Broader Generalization Studies
- **Extended evaluation**: Test on additional RF anomaly families
- **Real-world deployment**: Validate on live operational RF spectrum
- **Multi-modal anomalies**: Include complex interference combinations

#### 2. Enhanced Feature Map Design
- **Advanced randomization schemes**: Beyond Gaussian distributions
- **Hybrid architectures**: Combine QKS with alternative quantum approaches
- **Adaptive depth allocation**: Dynamic episode-depth balancing strategies

#### 3. Representation Extension
- **Alternative preprocessing**: Investigate other signal transforms (wavelets, graph-based methods)
- **Multi-modal inputs**: Combine RF spectrograms with additional signal features
- **Domain adaptation**: Learn representation-specific feature maps

#### 4. Hardware Scaling
- **Higher qubit counts**: Move toward practical quantum advantage regimes
- **Fault-tolerant considerations**: Explore error-corrected implementations
- **Cross-platform validation**: Test on multiple quantum hardware vendors

### E. Conclusions

This paper demonstrated that **Quantum Kitchen Sinks can serve as an effective feature enhancement framework** for RF spectrogram anomaly detection when combined with appropriate classical preprocessing (DCT). The multi-depth QKS configuration outperformed matched classical baselines across all tested representation-readout combinations, maintaining robustness under real quantum hardware execution.

Key contributions:

1. **Validated QKS utility**: Systematic improvement across multiple representation families
2. **Identified optimal configurations**: Depth 4 with Episodes 64 for entangled 10-qubit systems
3. **Confirmed hardware viability**: Small deviations between simulated and real-QPU performance
4. **Established methodological framework**: Validation-locked, leakage-free ablation protocol

Future directions remain critical to establish whether QKS provides **universal benefits** across all anomaly detection tasks or whether its value remains **task-specific**. The combination of **structured classical preprocessing** with **controlled quantum enhancement** suggests a promising path forward for hybrid quantum-classical approaches in practical signal processing applications.
