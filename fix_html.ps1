$files = Get-ChildItem -Path '.' -Filter '*.html'
foreach ($f in $files) {
    $content = Get-Content $f.FullName -Raw

    $socialRegex = '(?s)<div class="iv-footer__social">.*?</svg>\s*</a>\s*</div>'
    if ($content -match $socialRegex) {
        $socialBlock = $matches[0]
        $content = $content -replace [regex]::Escape($socialBlock), ''
        
        $brandTextRegex = '(?s)(<p class="iv-footer__brand-text">.*?</p>\s*)'
        $content = $content -replace $brandTextRegex, "`$1`n          $socialBlock`n"
    }

    if ($content -notmatch 'iv-back-to-top') {
        $backToTop = "`n  <button class='iv-back-to-top' aria-label='Back to top'>`n    <svg xmlns='http://www.w3.org/2000/svg' viewBox='0 0 24 24' fill='none' stroke='currentColor' stroke-width='2'>`n      <polyline points='18 15 12 9 6 15'></polyline>`n    </svg>`n  </button>`n"
        $content = $content -replace '</body>', "$backToTop</body>"
    }

    Set-Content -Path $f.FullName -Value $content
}
