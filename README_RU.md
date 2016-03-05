# vue media query methods
Плагин добавляет в области видемости vue методы для работы с media query

## Вводный пример:
```javascript
import vMediaQuery from 'v-media-query'

Vue.use(vMediaQuery.default)
```

```html
<some-component v-if="$mq.resize && $mq.above('600px')"></some-component>
```
v-if получит результат true для всех окон с ``width > 600px`` и обновляется при ресайзе окна.

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

---

## Стандартные методы
Все методы доступны в объекте ``$mq`` (media query)

``$mq.resize``
  * переменная являющаяся триггером для пересчета media выражения

---

``$mq.above(measurement, value)`` <br/>
``$mq.below(measurement, value)`` <br/>
``$mq.between(measurement, [valMin, valMax])`` <br/>
``$mq.beyond(measurement, [valMin, valMAx])`` <br/>

  * ``measurement``
    * Может принимать зачения: ``'width'``, ``'height'``
    * Стандартное значение = ``'width'`` <br/>
      example: ``$mq.above(600) == $mq.above('width', 600)``
  * ``value, valMin, valMax``
    * Может принимать значени типа ``Number`` и ``String``
    * Все значения типа ``Number`` будут переведенны в ``Number + 'px'`` <br/>
      example: ``$mq.above(600) == $mq.above('600px')``

---

``$mq.expr(expression)``
  * expression - любое валидное css media выражение <br/>
    example: $mq.expr('screen and (max-device-width: 300px)')

## Свои методы
К стандартным методам можно добавить свои методы

### Пример
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

## Переменные
Плагин позволяет добавить в область видемости vue так же переменные <br/>
Все переменные доступны в объекте ``$mv`` (media variables)

### Пример
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

## Наименование $mq и $mv
Если вам по каким-то причинам не нравятся обозначения ``$mq``, ``$mv``, вы можете задать их самостаятельно
<br/> (Исполльзуйте в начале имени $ || $$ || _ || __ так вы сможете избежать неожиданных конфликтов)

### Пример
```javascript
Vue.use(vvMediaQuery.default, {
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
