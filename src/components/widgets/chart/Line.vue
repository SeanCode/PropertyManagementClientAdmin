<script>
  import {Line} from 'vue-chartjs'

  export default Line.extend({
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
