<script type="ts">
  import icons from './icons'

  export let name: string
  export let size = '1.5rem'
  export let focusable = false
  export let strokeWidth = '2'

  const icon = icons[name]
</script>

<svg class="{$$props.class} icon-{name}" stroke-width="{strokeWidth}" fill="currentColor" {focusable}
     width={size} height={size} viewBox="0 0 {icon.box} {icon.box}">{@html icon.svg}</svg>
