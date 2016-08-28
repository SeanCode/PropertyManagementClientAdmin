/**
 * Created by Cheney Yang <yangcheng0816@gmail.com> on 16/8/28.
 */
export default {
  show: show,
  update: update,
  hide: hide
}

function show (context) {
  context.$root.$dispatch('progress::show')
}

function update (context, value) {
  context.$root.$dispatch('progress::update', value)
}

function hide (context) {
  context.$root.$dispatch('progress::hide')
}
