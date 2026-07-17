import React from 'react';
import Header from '../components/layout/Header';
import Footer from '../components/layout/Footer';
import Card from '../components/ui/Card';
import Button from '../components/ui/Button';

const Download: React.FC = () => {
  return (
    <div className="min-h-screen bg-slate-50 dark:bg-slate-900 flex flex-col">
      <Header />
      <main className="flex-1 max-w-4xl mx-auto px-4 pt-24 pb-12 w-full">
        <h1 className="text-3xl font-bold text-slate-900 dark:text-white mb-8">
          Downloads
        </h1>

        <div className="grid md:grid-cols-2 lg:grid-cols-3 gap-6 mb-12">
          <Card title="Paper (PDF)">
            <p className="mb-4 text-slate-600 dark:text-slate-300">
              Download the full paper in PDF format.
            </p>
            <Button
              variant="primary"
              onClick={() => window.open('/paper.pdf', '_blank')}
            >
              Download PDF
            </Button>
          </Card>

          <Card title="Paper (HTML)">
            <p className="mb-4 text-slate-600 dark:text-slate-300">
              Self-contained HTML with KaTeX math rendering. Print-ready.
            </p>
            <Button
              variant="secondary"
              onClick={() => window.open('/paper.html', '_blank')}
            >
              Open HTML
            </Button>
          </Card>

          <Card title="Paper (DOCX)">
            <p className="mb-4 text-slate-600 dark:text-slate-300">
              Microsoft Word document for editing and annotation.
            </p>
            <Button
              variant="secondary"
              onClick={() => window.open('/paper.docx', '_blank')}
            >
              Download DOCX
            </Button>
          </Card>

          <Card title="BibTeX Citation" className="md:col-span-2 lg:col-span-3">
            <pre className="text-xs bg-slate-100 dark:bg-slate-700 p-3 rounded mb-4 overflow-x-auto text-slate-700 dark:text-slate-300">
{`@article{aaraba2026quantum,
  title={RF Spectrogram Anomaly Detection with Quantum Kitchen Sinks},
  author={Aaraba, A. and Vieloszynski, A. and Polus, R. and Ahmad, O. and Cherkaoui, S.},
  year={2026}
}`}
            </pre>
            <Button
              variant="secondary"
              onClick={() => {
                navigator.clipboard.writeText(`@article{aaraba2026quantum,\n  title={RF Spectrogram Anomaly Detection with Quantum Kitchen Sinks},\n  author={Aaraba, A. and Vieloszynski, A. and Polus, R. and Ahmad, O. and Cherkaoui, S.},\n  year={2026}\n}`);
              }}
            >
              Copy BibTeX
            </Button>
          </Card>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default Download;
