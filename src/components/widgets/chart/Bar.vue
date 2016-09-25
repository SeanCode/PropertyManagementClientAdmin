<script>
  import {Bar} from 'vue-chartjs'

  export default Bar.extend({
    props: {
      data: {
        twoWay: true
      },
      options: {
      }
    },
    ready () {
      this.render(this.data, this.options)
    }
  })
</script>
