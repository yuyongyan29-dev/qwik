import type { ComputedFn } from '../../use/use-computed';
import type { TaskFn } from '../../use/use-task';
import type { QRL } from './qrl.public';
import type { QRLInternal } from './qrl-class';

/**
 * QRLs for core's own handlers, keyed by role. Callers add captures with `.w([...])`.
 *
 * The `@qwik.dev/core` library entry (`core/qwik-lib.ts`) fills these in with `inlinedQrl()`, so
 * the app's optimizer gives each one a segment and a manifest entry like any library QRL.
 */
/** @internal */
export interface CoreQrls {
  /** Event handler wrapper that restores captures before calling the user handler. */
  run: QRLInternal<any>;
  /** `bind:checked` input handler. */
  chk: QRLInternal<any>;
  /** `bind:value` input handler. */
  val: QRLInternal<any>;
  /** Visible task trigger. */
  task: QRLInternal<any>;
  /** Resource function wrapper. */
  rsc: QRLInternal<any>;
  /** Eager resume of state roots. */
  res: QRLInternal<any>;
  /** Catch boundary reset. */
  caR: QRLInternal<() => void>;
  /** Each, Show, Pending and Reveal tasks and computeds. */
  eaT: QRLInternal<TaskFn>;
  shT: QRLInternal<TaskFn>;
  peT: QRLInternal<TaskFn>;
  reR: QRLInternal<ComputedFn<boolean>>;
  reT: QRLInternal<TaskFn>;
}

/** @internal */
export const coreQrls = {} as CoreQrls;

const coreQrlHashes = new Set<string>();

/** @internal */
export const _setCoreQrls = (qrls: Record<keyof CoreQrls, QRL<any>>) => {
  Object.assign(coreQrls, qrls);
  for (const qrl of Object.values(coreQrls)) {
    coreQrlHashes.add(qrl.$hash$);
  }
};

/** Whether the QRL is one of core's own handlers, whatever symbol name the optimizer gave it. */
export const isCoreQrl = (qrl: QRLInternal) => coreQrlHashes.has(qrl.$hash$);
