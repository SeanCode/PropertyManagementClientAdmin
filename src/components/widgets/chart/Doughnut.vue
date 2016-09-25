<script>
  import {Doughnut} from 'vue-chartjs'

  export default Doughnut.extend({
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
