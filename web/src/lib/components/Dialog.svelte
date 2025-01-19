<script lang="ts">
  import type { Snippet } from "svelte";

  let _dialog = $state() as HTMLDialogElement;

  interface Props {
    children?: Snippet;
    onclose?: () => void;
  }

  let { children, onclose }: Props = $props();

  export function open() {
    _dialog.showModal();
  }

  export function close() {
    onclose?.();
    _dialog.close();
  }

  function handleClick(event: Event) {
    event.stopPropagation();
  }
</script>

<!-- svelte-ignore a11y_click_events_have_key_events, a11y_no_noninteractive_element_interactions -->
<dialog
  onclick={() => close()}
  bind:this={_dialog}
  class="bg-transparent w-1/3"
>
  <div
    role="dialog"
    onclick={handleClick}
    class="rounded-lg bg-white overflow-hidden"
  >
    {@render children?.()}
  </div>
</dialog>

<style>
  dialog {
    transition: all ease-in 0.16s allow-discrete;
    transform: translateY(128px) scale(0.8);
    opacity: 0;
    box-shadow: 0 2px 4px 0 rgba(0, 0, 0, 0.4);
  }

  dialog[open] {
    transition: all ease-out 0.24s allow-discrete;
    transform: translateY(0) scale(1);
    opacity: 1;

    @starting-style {
      transform: translateY(16px) scale(0.4);
      opacity: 0;
    }
  }

  dialog::backdrop {
    transition: all ease-out 0.3s allow-discrete;
    backdrop-filter: blur(0);
    background-color: rgba(0, 0, 0, 0);
  }

  dialog[open]::backdrop {
    backdrop-filter: blur(4px);
    background-color: rgba(0, 0, 0, 0.3);

    @starting-style {
      backdrop-filter: blur(0);
    }
  }
</style>
