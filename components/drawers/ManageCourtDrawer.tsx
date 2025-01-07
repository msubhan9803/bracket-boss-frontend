import { DynamicFormField } from '@/global'
import { useMemo } from 'react'
import DynamicFormSheet from '../core/DynamicFormSheet'
import { Court } from '@/graphql/generated/graphql'

type ManageCourtDrawerProps = {
  editModalOpen: boolean
  setEditModalOpen: any
  onUpdate: (id: string, data: any) => any
  item: Partial<Court>
}

const ManageCourtDrawer = ({ editModalOpen, setEditModalOpen, onUpdate, item }: ManageCourtDrawerProps) => {
  const formFields = useMemo(() => {
    const fields: DynamicFormField<any>[] = [
      {
        type: "render",
        className: "col-span-2",
        isVisible: true,
        render: () => (
          <h1 className='text-lg font-bold'>Court Details</h1>
        ),
      },
      {
        label: 'Name',
        name: 'name',
        type: 'text',
        placeholder: 'Court Name',
        required: true,
        defaultValue: item?.name || '',
        className: 'col-span-2',
      },
      {
        label: "Court Length",
        name: "courtLength",
        type: "number",
        placeholder: "e.g. 10",
        suffixRender: <p>feet</p>,
        className: 'col-span-2 lg:col-span-1',
      },
      {
        label: "Court Width",
        name: "courtWidth",
        type: "number",
        placeholder: "e.g. 10",
        suffixRender: <p>feet</p>,
        className: 'col-span-2 lg:col-span-1',
      },
      {
        label: "Match Differnce",
        name: "matchDifference",
        type: "number",
        placeholder: "e.g. 60",
        suffixRender: <p>minutes</p>,
        className: 'col-span-2 lg:col-span-1',
      },
      {
        type: "render",
        className: "col-span-2 my-2",
        isVisible: true,
        render: () => (
          <hr />
        ),
      },
      {
        type: "render",
        className: "col-span-2",
        isVisible: true,
        render: () => (
          <h1 className='text-lg font-bold'>Court Timings</h1>
        ),
      },
    ];

    return fields;
  }, [item]);

  return (
    <DynamicFormSheet
      isOpen={editModalOpen}
      setIsOpen={setEditModalOpen}
      title='Update Court'
      submitButtonLabel='Save Changes'
      description='Update properties for this court'
      fields={formFields}
      onSubmit={(values) => onUpdate(item?.id as string, values)}
      fixedFooter
      formGridCols="grid-cols-2"
    />
  )
}

export default ManageCourtDrawer
