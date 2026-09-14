import json
from pathlib import Path
from html.parser import HTMLParser

root = Path('dist')
missing = set()
class Assets(HTMLParser):
    def handle_starttag(self, tag, attrs):
        for key, value in attrs:
            if key not in ('src', 'href', 'poster', 'data-deck') or not value:
                continue
            if value.startswith(('#', 'http:', 'https:', 'mailto:', 'data:')):
                continue
            path = root / value
            if not path.is_file() or path.stat().st_size == 0:
                missing.add(value)
            elif key == 'data-deck':
                for slide in json.loads(path.read_text()):
                    asset = root / slide['src']
                    if not asset.is_file() or asset.stat().st_size == 0:
                        missing.add(slide['src'])
Assets().feed((root / 'index.html').read_text())
if missing:
    raise SystemExit('Restore these files before publishing:\n' + '\n'.join(sorted(missing)))
print('All referenced assets are present.')
