/**
 * The `@qwik.dev/core` library layer: core's own QRLs.
 *
 * It ships as `index.qwik.mjs`, so the app's optimizer turns each `inlinedQrl()` here into a
 * segment with a manifest entry, like any Qwik library. Values may only come from
 * `@qwik.dev/core/internal` so this module evaluates after the runtime. Symbol names must differ
 * from the local function names, or dev segments redeclare them.
 */
import {
  _caC as catchCmp,
  _caR as catchReset,
  _chk as bindChecked,
  _eaC as eachCmp,
  _eaT as eachCmpTask,
  _peC as pendingCmp,
  _peT as pendingTask,
  _reC as revealCmp,
  _reR as revealCanReveal,
  _reT as revealCleanupTask,
  _res as resumeRoots,
  _rsc as resourceFn,
  _run as runEventHandler,
  _setCoreQrls,
  _shC as showCmp,
  _shT as showCmpTask,
  _task as scheduleTask,
  _val as bindValue,
  componentQrl,
  inlinedQrl,
  type _QRLInternal,
} from '@qwik.dev/core/internal';
import type { Component } from './shared/component.public';
import type { EachComponent, EachProps } from './control-flow/each';
import type { PendingProps } from './control-flow/pending';
import type { ShowComponent, ShowProps } from './control-flow/show';
import type { RevealProps, revealCmp as revealComponent } from './control-flow/reveal';
import type { CatchProps } from './shared/error/catch';

_setCoreQrls({
  run: inlinedQrl(runEventHandler, 'q_run'),
  chk: inlinedQrl(bindChecked, 'q_chk'),
  val: inlinedQrl(bindValue, 'q_val'),
  task: inlinedQrl(scheduleTask, 'q_task'),
  rsc: inlinedQrl(resourceFn, 'q_rsc'),
  res: inlinedQrl(resumeRoots, 'q_res'),
  caR: inlinedQrl(catchReset, 'q_caR'),
  eaT: inlinedQrl(eachCmpTask, 'q_eaT'),
  shT: inlinedQrl(showCmpTask, 'q_shT'),
  peT: inlinedQrl(pendingTask, 'q_peT'),
  reR: inlinedQrl(revealCanReveal, 'q_reR'),
  reT: inlinedQrl(revealCleanupTask, 'q_reT'),
});

/** @public @experimental */
export const Each = /*#__PURE__*/ componentQrl<EachProps<any>>(
  /*#__PURE__*/ inlinedQrl(eachCmp, 'q_eaC')
) as EachComponent;

/** @public @experimental */
export const Show = /*#__PURE__*/ componentQrl<ShowProps<any>>(
  /*#__PURE__*/ inlinedQrl(showCmp, 'q_shC')
) as ShowComponent;

/** @public @experimental */
export const Pending: Component<PendingProps> = /*#__PURE__*/ componentQrl<PendingProps>(
  /*#__PURE__*/ inlinedQrl(pendingCmp, 'q_peC')
);

/** @public @experimental */
export const Reveal = /*#__PURE__*/ componentQrl<RevealProps>(
  /*#__PURE__*/ inlinedQrl(revealCmp, 'q_reC')
) as typeof revealComponent;

/** Renders `fallback$` instead of its children when a descendant throws. @public @experimental */
export const Catch: Component<CatchProps> = /*#__PURE__*/ componentQrl<CatchProps>(
  /*#__PURE__*/ inlinedQrl(catchCmp, 'q_caC')
);
