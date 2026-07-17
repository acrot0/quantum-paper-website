import React from 'react';
import { Link } from 'react-router-dom';
import Button from '../components/ui/Button';
import Card from '../components/ui/Card';

const metrics = [
  { label: 'AUROC', value: '0.8778', color: 'text-blue-600' },
  { label: 'F1 Score', value: '0.7995', color: 'text-blue-600' },
  { label: 'Train Samples', value: '21,600', color: '' },
  { label: 'Test Samples', value: '8,124', color: '' },
];

const Home: React.FC = () => {
  return (
    <div className="min-h-screen bg-gradient-to-b from-slate-50 to-white dark:from-slate-900 dark:to-slate-800">
      <main className="max-w-4xl mx-auto px-4 py-20 text-center">
        <h1 className="text-4xl md:text-5xl font-bold text-slate-900 dark:text-white mb-4">
          RF Spectrogram Anomaly Detection
        </h1>
        <p className="text-2xl md:text-3xl text-blue-700 dark:text-blue-400 mb-2 font-serif italic">
          with Quantum Kitchen Sinks
        </p>

        <div className="mt-4 mb-10 text-slate-600 dark:text-slate-400 text-sm">
          <p>Abdallah Aaraba, Alexis Vieloszynski, Remon Polus, Ola Ahmad, Soumaya Cherkaoui</p>
          <p>Polytechnique Montr&eacute;al &middot; Thales cortAIx Lab</p>
        </div>

        <Card className="mb-12 max-w-2xl mx-auto">
          <p className="text-lg text-slate-700 dark:text-slate-300 leading-relaxed">
            This paper presents a novel approach to RF spectrum anomaly detection using
            quantum machine learning with <strong>Quantum Kitchen Sinks (QKS)</strong>.
            We validate the proposed architecture on IBM&rsquo;s Quebec QPU, achieving
            an AUROC of 0.8778 and F1-score of 0.7995, with DCT representation
            consistently outperforming raw input and PCA-based approaches.
          </p>
        </Card>

        <div className="grid grid-cols-2 md:grid-cols-4 gap-4 mb-12">
          {metrics.map((m) => (
            <Card key={m.label} className="text-center">
              <div className={`text-3xl font-bold ${m.color || 'text-slate-900 dark:text-white'}`}>
                {m.value}
              </div>
              <div className="text-sm text-slate-500 dark:text-slate-400 mt-1">
                {m.label}
              </div>
            </Card>
          ))}
        </div>

        <div className="flex justify-center gap-4">
          <Link to="/paper">
            <Button variant="primary" size="lg">
              Start Reading
            </Button>
          </Link>
          <Link to="/download">
            <Button variant="secondary" size="lg">
              Download PDF
            </Button>
          </Link>
        </div>
      </main>
    </div>
  );
};

export default Home;
