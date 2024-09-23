import {atom} from "shared/lib/factory";
import {createGate} from "effector-react";
import {createEvent, createStore, sample} from "effector";
import {convertQuery} from "pages/home/api";

export const homeModel = atom(() => {
  const HomeGate = createGate()

  const onConvert = createEvent()
  const onSourceChange = createEvent<string>()

  const $pending = convertQuery.$pending
  const $source = createStore('')
  const $mermaid = createStore('')

  sample({
    clock: onConvert,
    source: $source,
    filter: (source) => !!source,
    target: convertQuery.start,
  })

  sample({
    source: onSourceChange,
    target: $source,
  })

  sample({
    source: convertQuery.finished.success,
    fn: ({result}) => result,
    target: $mermaid,
  })

  return {
    HomeGate,
    onConvert,
    onSourceChange,
    $pending,
    $source,
    $mermaid,
  }
})
