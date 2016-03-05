# vue media query methods
Plugin for vue, adds methods for work with media query

## General example:
```javascript
import vMediaQuery from 'v-media-query'

Vue.use(vMediaQuery.default)
```

```html
<some-component v-if="$mq.resize && $mq.above('600px')"></some-component>
```
v-if get ``true`` for all screen with ``width > 600px`` and will update after resize

```javascript
new Vue({
  created() {
    if (this.$mq.above(600)) {
      console.log('screen > 600px')
    }
  }
})

new Vue({
  watch: {
    '$mq.resize': 'screenResize'
  },
  methods: {
    screenResize() {
      if (this.$mq.above(600)) {
        console.log('screen > 600px')
      }
    }
  }
})

new Vue({
  computed: {
    screenMore600() {
      return this.$mq.resize && this.$mq.above(600)
    }
  }
})
```
and [here](https://github.com/AStaroverov/v-media-query/blob/master/index.html)

## Defaults methods
All methods allow in ``$mq`` (mq = media query)

``$mq.resize``
  * variable for trigger update methods

---

``$mq.above(measurement, value)`` <br/>
``$mq.below(measurement, value)`` <br/>
``$mq.between(measurement, [valMin, valMax])`` <br/>
``$mq.beyond(measurement, [valMin, valMAx])`` <br/>

  * ``measurement``
    * Can take values: ``'width'``, ``'height'``
    * Default value = ``'width'`` <br/>
      example: ``$mq.above(600) == $mq.above('width', 600)``
  * ``value, valMin, valMax``
    * Can take type ``Number`` and ``String``
    * All value type of ``Number`` will be rewrite to ``Number + 'px'`` <br/>
      example: ``$mq.above(600) == $mq.above('600px')``

---

``$mq.expr(expression)``
  * expression - any valid css media query <br/>
    example: $mq.expr('screen and (max-device-width: 300px)')

## Custom methods
Your can add custom methods for default methods

### Example
```javascript
Vue.use(vMediaQuery.default, {
  methods: {
    onlyForRetina() {
      return matchMedia('(-webkit-min-device-pixel-ratio: 2), (min-resolution: 192dpi)').matches
    }
    fackAbove(...args) {
      return vMediaQuery.methods.above(...args)
    },
  }
})
```
```html
<some-component v-if="$mq.onlyForRetina()"></some-component>
<some-component v-show="$mq.resize && $mq.fackAbove(800)"></some-component>
```

## Variables
The plugin allows you to add in the vue scope custom variables <br/>
All variables available in the ``$mv`` (mv = media variables)

### Example
```javascript
Vue.use(vMediaQuery.default, {
  variables: {
    hd: 1920,
    sm: '1240px'
  }
})
```
```html
<some-component v-show="$mq.resize && $mq.between([$mv.sm, $mv.hd])"></some-component>
```

## Namespace $mq and $mv
If u don`t like $mq and $mv namespaces u can change this

### Example
```javascript
Vue.use(vMediaQuery.default, {
  nameSpace: {
    methods: $$myMethods, // default $mq
    variables: __myVariables, // default $mv
  },
  variables: {
    hd: 1920,
  }
})
```
```html
<some-component v-show="$$myMethods.resize && $$myMethods.above(__myVariables.hd)"></some-component>
```
