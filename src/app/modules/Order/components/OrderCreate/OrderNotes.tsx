import { useState } from 'react'
import { Flex, Input, Segmented, Select, Typography, Upload } from 'antd'
import { IconPlus, IconChevronDown } from '@tabler/icons-react'
import { useOrderCreateStyles } from './OrderCreate.style'
import type { NoteType } from '../../types'

interface OrderNotesProps {
  tags: string[]
  availableTags: string[]
  noteType: NoteType
  note: string
  onNoteTypeChange: (type: NoteType) => void
  onNoteChange: (note: string) => void
  onTagsChange: (tags: string[]) => void
}

const NOTE_MAX = 500

export function OrderNotes({
  tags,
  availableTags,
  noteType,
  note,
  onNoteTypeChange,
  onNoteChange,
  onTagsChange,
}: OrderNotesProps) {
  const [uploadList] = useState([])
  const { styles } = useOrderCreateStyles()

  return (
    <Flex gap={24}>
      <Flex vertical gap={8} style={{ flex: '0 0 120px' }}>
        <Typography.Text type="secondary">Đính kèm</Typography.Text>
        <Upload fileList={uploadList} listType="picture-card" showUploadList={false}>
          <Flex vertical align="center" gap={4}>
            <IconPlus size={14} className={styles.uploadIcon} />
            <Typography.Text className={styles.uploadLabel}>Tải file lên</Typography.Text>
          </Flex>
        </Upload>
      </Flex>

      <Flex vertical gap={8} style={{ flex: 1 }}>
        <Flex align="center" justify="space-between">
          <Typography.Text type="secondary">Ghi chú</Typography.Text>
          <Segmented
            size="small"
            value={noteType}
            onChange={(v) => onNoteTypeChange(v as NoteType)}
            options={[
              { label: 'Nội bộ', value: 'internal' },
              { label: 'Khách hàng', value: 'customer' },
            ]}
          />
        </Flex>
        <div style={{ position: 'relative' }}>
          <Input.TextArea
            value={note}
            onChange={(e) => onNoteChange(e.target.value)}
            maxLength={NOTE_MAX}
            placeholder="Nhập ghi chú"
            rows={4}
          />
          <Typography.Text type="secondary" className={styles.noteCharCount}>
            {note.length}/{NOTE_MAX}
          </Typography.Text>
        </div>

        <Typography.Text type="secondary">Tag</Typography.Text>
        <Select
          mode="multiple"
          value={tags}
          onChange={onTagsChange}
          placeholder="Nhập tag"
          options={availableTags.map((t) => ({ value: t, label: t }))}
          suffixIcon={<IconChevronDown size={14} />}
        />
      </Flex>
    </Flex>
  )
}
