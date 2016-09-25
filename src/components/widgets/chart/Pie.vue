<script>
  import {Pie} from 'vue-chartjs'

  export default Pie.extend({
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
