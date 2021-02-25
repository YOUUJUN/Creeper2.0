<script>
    export default {
        props: {
            name: {
                require: true,
            }
        },
        render(createElement) {
            let self = this
            return createElement('input', {
                domProps: {
                    value: self.name
                },
                on: {
                    input(event) {
                        // self.$emit('input', event.target.value)
                    }
                }
            })
        }
    };
</script>