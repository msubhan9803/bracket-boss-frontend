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
        label: 'Name',
        name: 'name',
        type: 'text',
        placeholder: 'Court Name',
        required: true,
        defaultValue: item?.name || '',
      },
    ]

    return fields
  }, [item])

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
    />
  )
}

export default ManageCourtDrawer
