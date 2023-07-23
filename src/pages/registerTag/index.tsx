import { TagsPDFContainer } from '../../serverComponents/TagsPDFContainer'

const tags = [{
  data: {
    amount: 1,
    classification: 'acabado',
    description: 'Carpete moldado esquedo',
    partNumber: '618748189',
    projectNumber: '592',
    sapCode: '112847718.01',
    technicalDescription: 'carpete font fender esquedo',
    ute: 'ute-5',
    id: '1'
  },
  isFractional: false,
  tagId: 'dsvkuabsiufahw pieufa'
}]

export function RegisterTag () {
  return (
    <>
      <TagsPDFContainer {...{ tags }}/>
      <TagsPDFContainer {...{ tags }}/>
    </>
  )
}
