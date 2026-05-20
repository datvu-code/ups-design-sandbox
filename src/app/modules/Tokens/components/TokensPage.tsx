import { Flex, Input, Segmented, Typography, message, theme } from 'antd'
import { useMemo, useState } from 'react'
import { IconSearch } from '@tabler/icons-react'

// ─── helpers ────────────────────────────────────────────────────────────────

function toCSSVar(key: string): string {
  return (
    '--ant-' +
    key
      .replace(/([a-z0-9])([A-Z])/g, '$1-$2')
      .replace(/([A-Z]+)([A-Z][a-z0-9]+)/g, '$1-$2')
      .replace(/([a-z])([A-Z0-9])/g, '$1-$2')
      .toLowerCase()
  )
}

function isColor(value: string): boolean {
  return value.startsWith('#') || value.startsWith('rgb') || value.startsWith('rgba')
}

/** Read every --ant-* CSS variable injected by antd into the document. */
function readDomCSSVars(): Record<string, string> {
  const vars: Record<string, string> = {}
  try {
    for (const sheet of Array.from(document.styleSheets)) {
      let rules: CSSRuleList
      try { rules = sheet.cssRules } catch { continue }
      for (const rule of Array.from(rules)) {
        if (!(rule instanceof CSSStyleRule)) continue
        const { style } = rule
        for (let i = 0; i < style.length; i++) {
          const prop = style[i]
          if (prop.startsWith('--ant-')) {
            vars[prop] = style.getPropertyValue(prop).trim()
          }
        }
      }
    }
  } catch { /* cross-origin sheets are inaccessible */ }
  return vars
}

// ─── global token grouping ───────────────────────────────────────────────────

const GLOBAL_GROUP_PREFIXES: { title: string; match: RegExp }[] = [
  { title: 'Color', match: /^color/ },
  { title: 'Padding', match: /^padding/ },
  { title: 'Margin', match: /^margin/ },
  { title: 'Border Radius', match: /^borderRadius/ },
  { title: 'Font Size', match: /^fontSize/ },
  { title: 'Font Weight', match: /^fontWeight/ },
  { title: 'Line Height', match: /^lineHeight/ },
  { title: 'Font Family', match: /^fontFamily/ },
  { title: 'Shadow', match: /^boxShadow|^shadow/ },
  { title: 'Line', match: /^lineWidth|^lineType/ },
  { title: 'Size & Control', match: /^size|^controlHeight|^controlPadding/ },
  { title: 'Motion', match: /^motion|^duration/ },
  { title: 'Z-Index', match: /^zIndex/ },
  { title: 'Opacity', match: /^opacity/ },
  { title: 'Breakpoint', match: /^screen/ },
]

function groupGlobalTokens(token: Record<string, unknown>) {
  const groups: Record<string, Record<string, unknown>> = {}
  const assigned = new Set<string>()
  for (const { title, match } of GLOBAL_GROUP_PREFIXES) {
    const entries = Object.entries(token).filter(([k]) => match.test(k))
    if (entries.length) {
      groups[title] = Object.fromEntries(entries)
      entries.forEach(([k]) => assigned.add(k))
    }
  }
  const rest = Object.entries(token).filter(([k]) => !assigned.has(k))
  if (rest.length) groups['Other'] = Object.fromEntries(rest)
  return groups
}

// ─── component token grouping ────────────────────────────────────────────────

/** Extract component name from --ant-[component]-[property] */
function componentFromVar(cssVar: string): string {
  // --ant-button-font-weight → "button"
  // --ant-color-primary      → null (global)
  const withoutPrefix = cssVar.replace(/^--ant-/, '')
  // If it matches a known global prefix, skip
  const globalPrefixes = /^(color|padding|margin|border-radius|font-size|font-weight|line-height|font-family|box-shadow|line-width|line-type|size|control|motion|duration|z-index|opacity|screen)/
  if (globalPrefixes.test(withoutPrefix)) return ''
  // First segment is the component name
  const segment = withoutPrefix.split('-')[0]
  return segment ?? ''
}

function groupComponentVars(vars: Record<string, string>) {
  const groups: Record<string, Record<string, string>> = {}
  for (const [cssVar, value] of Object.entries(vars)) {
    const component = componentFromVar(cssVar)
    if (!component) continue
    const title = component.charAt(0).toUpperCase() + component.slice(1)
    if (!groups[title]) groups[title] = {}
    groups[title][cssVar] = value
  }
  return groups
}

// ─── shared row ──────────────────────────────────────────────────────────────

interface TokenRowProps {
  label: string       // token key (global) or CSS var name (component)
  cssVar: string
  value: string
}

function TokenRow({ label, cssVar, value }: TokenRowProps) {
  const handleCopy = () => {
    navigator.clipboard.writeText(`var(${cssVar})`)
    message.success(`Copied var(${cssVar})`)
  }

  return (
    <Flex
      align="center"
      gap={16}
      onClick={handleCopy}
      title="Click to copy CSS variable"
      style={{
        padding: 'var(--ant-padding-xs) var(--ant-padding-sm)',
        borderBottom: 'var(--ant-line-width) var(--ant-line-type) var(--ant-color-border-secondary)',
        cursor: 'pointer',
      }}
    >
      {/* Swatch / visual */}
      <div style={{ width: 36, flexShrink: 0, display: 'flex', alignItems: 'center' }}>
        {isColor(value) && (
          <div style={{
            width: 28, height: 28,
            borderRadius: 'var(--ant-border-radius)',
            backgroundColor: value,
            border: 'var(--ant-line-width) var(--ant-line-type) var(--ant-color-border-secondary)',
          }} />
        )}
        {!isColor(value) && /^\d+(\.\d+)?px$/.test(value) && /radius/i.test(label) && (
          <div style={{
            width: 26, height: 26,
            border: 'var(--ant-line-width) var(--ant-line-type) var(--ant-color-primary)',
            borderRadius: value,
          }} />
        )}
        {!isColor(value) && /^\d+(\.\d+)?px$/.test(value) && /padding|margin|size|height|width/i.test(label) && (
          <div style={{
            height: 10,
            width: Math.min(parseFloat(value), 48),
            backgroundColor: 'var(--ant-color-primary)',
            borderRadius: 2, opacity: 0.4,
          }} />
        )}
        {/shadow/i.test(label) && value.includes('px') && (
          <div style={{
            width: 24, height: 24,
            backgroundColor: 'var(--ant-color-bg-container)',
            borderRadius: 'var(--ant-border-radius)',
            boxShadow: value,
          }} />
        )}
      </div>

      {/* Label */}
      <Typography.Text style={{ width: 280, flexShrink: 0, fontFamily: 'monospace', fontSize: 'var(--ant-font-size-sm)' }}>
        {label}
      </Typography.Text>

      {/* Value */}
      <Typography.Text type="secondary" style={{ width: 200, flexShrink: 0, fontFamily: 'monospace', fontSize: 'var(--ant-font-size-sm)' }}>
        {value}
      </Typography.Text>

      {/* CSS var */}
      <Typography.Text style={{ fontFamily: 'monospace', fontSize: 'var(--ant-font-size-sm)', color: 'var(--ant-color-primary)' }}>
        var({cssVar})
      </Typography.Text>
    </Flex>
  )
}

// ─── section ──────────────────────────────────────────────────────────────────

function TokenSection({ title, rows }: { title: string; rows: { label: string; cssVar: string; value: string }[] }) {
  if (rows.length === 0) return null
  return (
    <section>
      <Flex
        align="center"
        justify="space-between"
        style={{
          marginBottom: 'var(--ant-margin-xs)',
          paddingBottom: 'var(--ant-padding-xs)',
          borderBottom: 'var(--ant-line-width) var(--ant-line-type) var(--ant-color-border)',
        }}
      >
        <Typography.Title level={5} style={{ margin: 0 }}>{title}</Typography.Title>
        <Typography.Text type="secondary" style={{ fontSize: 'var(--ant-font-size-sm)' }}>
          {rows.length}
        </Typography.Text>
      </Flex>
      {rows.map((r) => <TokenRow key={r.cssVar} {...r} />)}
    </section>
  )
}

// ─── page ─────────────────────────────────────────────────────────────────────

export function TokensPage() {
  const { token } = theme.useToken()
  const [search, setSearch] = useState('')
  const [tab, setTab] = useState<'global' | 'component'>('global')

  const domVars = useMemo(() => readDomCSSVars(), [])

  const allGlobal = token as unknown as Record<string, unknown>
  const globalGroups = useMemo(() => groupGlobalTokens(allGlobal), [allGlobal])
  const componentGroups = useMemo(() => groupComponentVars(domVars), [domVars])

  const q = search.trim().toLowerCase()

  const filterRows = (rows: { label: string; cssVar: string; value: string }[]) =>
    q ? rows.filter(r => r.label.includes(q) || r.cssVar.includes(q) || r.value.toLowerCase().includes(q)) : rows

  const globalTotal = Object.keys(allGlobal).length
  const componentTotal = Object.values(componentGroups).reduce((s, g) => s + Object.keys(g).length, 0)

  return (
    <div style={{ backgroundColor: 'var(--ant-color-bg-container)', borderRadius: 'var(--ant-border-radius-lg)', padding: 'var(--ant-padding-lg)' }}>
      <Flex justify="space-between" align="flex-start" style={{ marginBottom: 'var(--ant-margin-lg)' }}>
        <div>
          <Typography.Title level={3} style={{ margin: 0 }}>Design Tokens</Typography.Title>
          <Typography.Text type="secondary">Click any row to copy the CSS variable</Typography.Text>
        </div>
        <Input
          placeholder="Search token, variable, or value..."
          prefix={<IconSearch size={14} style={{ color: 'var(--ant-color-text-tertiary)' }} />}
          value={search}
          onChange={(e) => setSearch(e.target.value)}
          allowClear
          style={{ width: 300 }}
        />
      </Flex>

      <Flex align="center" justify="space-between" style={{ marginBottom: 'var(--ant-margin-lg)' }}>
        <Segmented
          value={tab}
          onChange={(v) => setTab(v as 'global' | 'component')}
          options={[
            { label: `Global (${globalTotal})`, value: 'global' },
            { label: `Component (${componentTotal})`, value: 'component' },
          ]}
        />
      </Flex>

      <Flex vertical gap={32}>
        {tab === 'global' && Object.entries(globalGroups).map(([title, tokens]) => (
          <TokenSection
            key={title}
            title={title}
            rows={filterRows(
              Object.entries(tokens).map(([k, v]) => ({
                label: k,
                cssVar: toCSSVar(k),
                value: typeof v === 'number' ? `${v}px` : String(v ?? ''),
              }))
            )}
          />
        ))}

        {tab === 'component' && Object.entries(componentGroups).sort(([a], [b]) => a.localeCompare(b)).map(([title, vars]) => (
          <TokenSection
            key={title}
            title={title}
            rows={filterRows(
              Object.entries(vars).map(([cssVar, value]) => ({
                label: cssVar,
                cssVar,
                value,
              }))
            )}
          />
        ))}
      </Flex>
    </div>
  )
}
