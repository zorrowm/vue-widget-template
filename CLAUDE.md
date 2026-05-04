# CLAUDE.md

This file provides guidance to Claude Code (claude.ai/code) when working with code in this repository.

## Project Overview

vue-widget-template is a Vue 3 widget-based development template built on top of `xframelib`. It provides a modular widget container system where UI components are registered as widgets and loaded into designated containers (top, left, bottom). The template supports multiple layout types: backLayout, bigScreen, sideLine, sideBar, main, and portal.

## Common Commands

```bash
pnpm dev          # Start development server
pnpm build        # Production build
pnpm serve        # Preview production build
pnpm clean        # Clear cache (rimraf components.d.ts, lock files, vite deps)
```

## Architecture

### Widget System

The core architectural pattern. Widgets are defined in `src/settings/widgetSetting/` and registered to containers via `LayoutContainerEnum` (top, left, bottom). Each layout (backLayout, bigScreen, etc.) has its own widget configuration file.

- `src/settings/widgetSetting/backLayout.ts` - backLayout widgets
- `src/settings/widgetSetting/bigScreen.ts` - bigScreen widgets
- Widget config uses `IWidgetConfig` interface from xframelib with properties: `layoutID`, `id`, `label`, `container`, `component`, `preload`

### Layout System

Located in `src/layouts/`. Each layout type has its own folder:
- `back/` - BackLayout with sidebar menu
- `bigScreen/` - Full-screen dashboard layout
- `sideLine/` - Side line navigation layout
- `sideBar/` - Sidebar layout
- `main/` - Main layout
- `portal/` - Portal layout

### Events System

Uses xframelib's `Global.EventBus` for widget communication via `src/events/`:

```typescript
import { OnEventHandler, OffEventHandler, EmitMsg } from '@/events';
// Listen
OnEventHandler('eventName', handler);
// Emit
EmitMsg('eventName', data);
// Remove listener
OffEventHandler('eventName', handler);
```

Key event definitions in `src/events/modules/WidgetsEvent.ts`:
- `ModalContainerWidget_LoadModal` - Trigger modal display
- `ModalContainerWidget_CloseModal` - Close modal

### State Management

Pinia stores in `src/store/modules/`:
- `app.ts` - Application state
- `user.ts` - User state
- `asyncRoute.ts` - Async routing state

### Routing

Vue Router with hash history. Routes defined in `src/router/`:
- `system/` - Shared system routes
- `back/`, `main/`, `bigScreen/`, `sideLine/`, `sideBar/` - Layout-specific routes
- `bussinessRoutes` array combines all layout routes for dynamic access

### Modal System

`ModalContainer` component (`src/components/ModalContainer/index.vue`) loads modals dynamically via `loadModal()`:
- Trigger: `EmitMsg(WidgetsEvent.ModalContainerWidget_LoadModal, { modalID, rowData, width, extraData })`
- Close: `EmitMsg(WidgetsEvent.ModalContainerWidget_CloseModal, data)`

Modal content components must implement `validateForm()` method if they contain forms.

### Configuration

- `vite.config.ts` - Vite build config with manual chunking for large deps (ant-design-vue, echarts, ol, xframelib, etc.)
- Environment variables in `.env`, `.env.development`, `.env.production`
- Path aliases: `@/` → `src/`, `#/` → `types/`
- `vite-build/` - Build utilities and plugins
- `components.d.ts` - Auto-generated component type declarations

### UI Framework

ant-design-vue 4.x with Chinese locale (`zh_CN`). Floating UI components from floating-vue for tooltips/dropdowns.

### Key Dependencies

- `xframelib` - Core framework providing Global, widget container, event bus, message, and permission systems
- `xgis-ol` - OpenLayers integration
- `xgis-plot` - Plotting library
- `echarts` - Charts
- `ol` - OpenLayers
