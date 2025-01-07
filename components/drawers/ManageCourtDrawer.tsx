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
      {
        type: "render",
        className: "col-span-2 my-4",
        isVisible: true,
        render: () => (
          <div className="flex items-center my-2">
            <div className="border-t border-1 border-gray-400 flex-grow"></div>
            <span className="px-3 text-primary text-sm">OR</span>
            <div className="border-t border-1 border-gray-400 flex-grow"></div>
          </div>
        ),
      },
    ];

    return fields
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
    />
  )
}

export default ManageCourtDrawer
