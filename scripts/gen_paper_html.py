"""Generate a standalone HTML export of the paper from markdown sections."""
import os
import re
import markdown

ROOT = os.path.dirname(os.path.dirname(os.path.abspath(__file__)))
SECTIONS_DIR = os.path.join(ROOT, 'public', 'data', 'sections')
OUT_PATH = os.path.join(ROOT, 'public', 'paper.html')

md_files = [
    'abstract.md', 'introduction.md', 'methodology.md',
    'experiments.md', 'discussion.md', 'conclusion.md', 'references.md'
]

sections = []
for fname in md_files:
    fpath = os.path.join(SECTIONS_DIR, fname)
    if os.path.exists(fpath):
        text = open(fpath, encoding='utf-8').read()
        html_body = markdown.markdown(text, extensions=['tables', 'fenced_code'])
        sections.append(html_body)
    else:
        sections.append(f'<h2>{fname}</h2><p>Content not available.</p>')

combined = '\n<hr/>\n'.join(sections)

full_html = f'''<!DOCTYPE html>
<html lang="en">
<head>
<meta charset="UTF-8">
<meta name="viewport" content="width=device-width, initial-scale=1.0">
<title>RF Spectrogram Anomaly Detection with Quantum Kitchen Sinks</title>
<link rel="stylesheet" href="https://cdn.jsdelivr.net/npm/katex@0.17.0/dist/katex.min.css">
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.17.0/dist/katex.min.js"></script>
<script defer src="https://cdn.jsdelivr.net/npm/katex@0.17.0/dist/contrib/auto-render.min.js"></script>
<script>
document.addEventListener("DOMContentLoaded", function() {{
  renderMathInElement(document.body, {{
    delimiters: [
      {{left: "$$", right: "$$", display: true}},
      {{left: "$", right: "$", display: false}},
      {{left: "\\[", right: "\\]", display: true}},
      {{left: "\\(", right: "\\)", display: false}}
    ]
  }});
}});
</script>
<style>
  body {{ font-family: "Times New Roman", Times, serif; max-width: 800px; margin: 0 auto; padding: 2rem 1rem; line-height: 1.8; color: #222; }}
  h1, h2, h3, h4 {{ font-family: Georgia, "Times New Roman", serif; color: #1a1a2e; }}
  h1 {{ font-size: 28px; border-bottom: 3px solid #1a365d; padding-bottom: .5rem; margin-top: 2rem; }}
  h2 {{ font-size: 22px; margin-top: 2rem; border-bottom: 1px solid #eee; padding-bottom: .3rem; }}
  h3 {{ font-size: 18px; margin-top: 1.5rem; }}
  code {{ background: #f4f4f4; padding: .2rem .4rem; border-radius: 4px; font-family: "Courier New", Courier, monospace; font-size: .9em; }}
  pre {{ background: #f8f8f8; padding: 1rem; border-radius: 6px; overflow-x: auto; border: 1px solid #ddd; }}
  pre code {{ background: none; padding: 0; }}
  blockquote {{ border-left: 4px solid #1a365d; margin: 1rem 0; padding: .5rem 1rem; background: #f7fafc; color: #555; }}
  table {{ border-collapse: collapse; width: 100%; margin: 1rem 0; }}
  th, td {{ border: 1px solid #ccc; padding: .5rem .75rem; text-align: left; }}
  th {{ background: #f0f0f0; font-weight: 600; }}
  tr:nth-child(even) {{ background: #fafafa; }}
  hr {{ border: none; border-top: 2px solid #e2e8f0; margin: 3rem 0; }}
  a {{ color: #1a365d; text-decoration: none; }}
  a:hover {{ text-decoration: underline; }}
  img {{ max-width: 100%; height: auto; }}
  .meta {{ text-align: center; margin-bottom: 3rem; color: #555; }}
  .meta p {{ margin: .3rem 0; }}
  .authors {{ font-size: 14px; margin-bottom: .5rem; }}
  .affiliation {{ font-size: 13px; color: #666; }}
  footer {{ margin-top: 3rem; padding-top: 1rem; border-top: 1px solid #eee; color: #999; font-size: 12px; text-align: center; }}
  @media print {{ body {{ padding: 0; }} hr {{ border-top: 1px solid #ccc; }} }}
</style>
</head>
<body>
<div class="meta">
  <h1 style="border:none; margin-bottom: .5rem;">RF Spectrogram Anomaly Detection with Quantum Kitchen Sinks</h1>
  <p class="authors">Abdallah Aaraba, Alexis Vieloszynski, Remon Polus, Ola Ahmad, Soumaya Cherkaoui</p>
  <p class="affiliation">Polytechnique Montr&eacute;al &middot; Thales cortAIx Lab</p>
</div>
{combined}
<footer>
  <p>Best configuration: AUROC = 0.8778, F1 = 0.7995 on ibm_quebec QPU</p>
  <p>Generated from quantum-paper-website &middot; 2026</p>
</footer>
</body>
</html>'''

os.makedirs(os.path.dirname(OUT_PATH), exist_ok=True)
open(OUT_PATH, 'w', encoding='utf-8').write(full_html)
print(f'OK -> {OUT_PATH}')
