<script>
  export default {
    props: ['case'],
    setup(props, { slots }) {
      return () => {
        if (slots[props.case]) {
          return slots[props.case]();
        }

        if (slots['default']) {
          return slots['default']();
        }
      };
    }
  };
</script>
