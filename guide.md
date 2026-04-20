# BestRentNYC Staging Site – Development Guide

## Tech Stack

- **Server-side:** ASP.NET Web Forms (.NET Framework 4.5.1, C#)
- **Master Page:** `CollectiveMain.Master` (all pages inherit from this)
- **Compiled DLL:** `TheCollective.dll` (code-behind logic, not editable here)
- **Client-side:** jQuery 1.3.2, Google Maps API v2, custom JS utilities
- **Web Services:** SOAP services at `bestrentnyc.247salescenter.com`
- **Mobile:** Sencha Touch (iPad), separate mobile registration page

## Staging Environment

- **URL:** https://bestrentnycdev.247salescenter.com
- **Server:** IIS with Windows Authentication
- **What we can edit:** `.aspx`, `.master`, `.ascx`, `.css`, `.js` files (front-end markup and styles)
- **What we cannot edit:** Code-behind (compiled in `TheCollective.dll`)

## Workflow

1. **Edit** files locally in this workspace
2. **Upload** changed files to the staging server
3. **Verify** using `curl` to check raw HTML source:
   ```bash
   curl -s https://bestrentnycdev.247salescenter.com/<page>.aspx | grep -i '<search term>'
   ```

## Key Gotcha: `runat="server"` Controls

Elements with `runat="server"` (e.g., `<img id="imgTopBanner" runat="server" />`) have their attributes **set by the compiled DLL at runtime**. Editing these attributes in `.aspx` markup may have **no effect** because the code-behind overrides them.

### Workaround

Instead of modifying attributes on the `runat="server"` element, apply changes to a **parent element** that does NOT have `runat="server"`.

**Example:** To add accessible labeling to a banner image link:
- **Won't work:** Changing `alt` on `<img runat="server" />` — code-behind overrides it
- **Works:** Adding `aria-label` on the parent `<a>` tag — not a server control, so markup is preserved

```html
<!-- aria-label on <a> is NOT overridden by code-behind -->
<a href="http://www.bestrentnyc.com" aria-label="BestRentNYC.com - Return to homepage">
  <img id="imgTopBanner" runat="server" border="0" alt="" />
</a>
```

## Pages with `imgTopBanner` (empty alt text)

These pages have the same banner image accessibility issue and could use the same `aria-label` fix on their `<a>` tags:

| Page | Current `alt` |
|------|--------------|
| `accessibility.aspx` | ✅ Fixed (aria-label on `<a>`) |
| `privacy.aspx` | `""` — needs fix |
| `UsefulLink.aspx` | `""` — needs fix |
| `News.aspx` | `""` — needs fix |
| `Login.aspx` | `""` — needs fix |
| `Communities.aspx` | `""` — needs fix |

## Verification Checklist

- [ ] Edit the `.aspx` file locally
- [ ] Upload to staging server
- [ ] Run `curl` against the live URL and grep for your change
- [ ] Confirm the change appears in the raw HTML (not just page text)
- [ ] If a `runat="server"` attribute is unchanged, the DLL is overriding it — use the parent element workaround
