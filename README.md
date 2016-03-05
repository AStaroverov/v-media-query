# vue media query methods
Плагин добавляет в области видемости vue методы для работы с media query

## Вводный пример:
```
import vMediaQuery from 'v-media-query'

Vue.use(vvMediaQuery.default)
```

```
<some-component v-if="$mq.resize && $mq.above('600px')"></some-component>
```
v-if получит результат true для всех окон с ``width > 600px``
и обновляется при ресайзе окна.

```
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

``$mq.above(measurement, value)``
``$mq.below(measurement, value)``
``$mq.between(measurement, [valMin, valMax])``
``$mq.beyond(measurement, [valMin, valMAx])``

  * ``measurement``
    * Может принимать зачения: ``'width'``, ``'height'``
    * Стандартное значение = ``'width'``
      example: ``$mq.above(600) == $mq.above('width', 600)``
  * ``value, valMin, valMax``
    * Может принимать значени типа ``Number`` и ``String``
    * Все значения типа ``Number`` будут переведенны в ``Number + 'px'``
      example: ``$mq.above(600) == $mq.above('600px')``

---

``$mq.expr(expression)``
  * expression - любое валидное css media выражение
    example: $mq.expr('screen and (max-device-width: 300px)')

## Свои методы
К стандартным методам можно добавить свои методы

### Пример
```
Vue.use(vvMediaQuery.default, {
  methods: {
    onlyForRetina() {
      return matchMedia('retina expression').matches
    }
    fackAbove(...args) {
      return vMediaQuery.methods.above(...args)
    },
  }
})
```
```
<some-component v-if="$mq.onlyForRetina()"></some-component>
<some-component v-show="$mq.resize && $mq.fackAbove(800)"></some-component>
```

## Переменные
Плагин позволяет добавить в область видемости vue так же переменные
Все переменные доступны в объекте ``$mv`` (media variables)

### Пример
```
Vue.use(vvMediaQuery.default, {
  variables: {
    hd: 1920,
    sm: '1240px'
  }
})
```
```
<some-component v-show="$mq.resize && $mq.between([$mv.sm, $mv.hd])"></some-component>
```

## Наименование $mq и $mv
Если вам по каким-то причинам не нравятся обозначения ``$mq``, ``$mv``, вы можете задать их самостаятельно
(Исполльзуйте в начале имени $ || $$ || _ || __ так вы сможете избежать неожиданных конфликтов)

### Пример
```
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
```
<some-component v-show="$$myMethods.resize && $$myMethods.above(__myVariables.hd)"></some-component>
```
