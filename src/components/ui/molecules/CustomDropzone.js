import { formatBytes, formatDuration } from "react-dropzone-uploader"
import CrossIcon from "@atlaskit/icon/glyph/cross";
import Button, { LoadingButton } from "@atlaskit/button";
import { Box } from "../atoms";

export const DropzoneSubmitButton = (props) => {
  const { buttonClassName, disabled, content, onSubmit, files } = props
  const _disabled =
    files.some(f => ['preparing', 'getting_upload_params', 'uploading'].includes(f.meta.status)) ||
    !files.some(f => ['headers_received', 'done'].includes(f.meta.status))

  const handleSubmit = () => {
    onSubmit(files.filter(f => ['headers_received', 'done'].includes(f.meta.status)))
  }
  return (
    <LoadingButton appearance="primary" isLoading={disabled || _disabled} onClick={handleSubmit} className={buttonClassName}>
      {content}
    </LoadingButton>
  )
}

export const DropzoneLayout = ({
  input,
  previews,
  submitButton,
  dropzoneProps,
  files,
  extra: { maxFiles },
  setIsOpen,
  setClosable = null
}) => (
  <div { ...dropzoneProps} style={{paddingBottom: "12px"}}>
    {previews}
    {setClosable && (files.length === 0 ? setClosable(true) : setClosable(false))}
    {files.length < maxFiles && input}
    <Box w="100%" d="flex" direction="row-reverse">
      {files.length > 0 && <Button appearance="subtle" style={{marginLeft: "10px", marginRight: "10px"}} onClick={() => setIsOpen(false)}>Cancel</Button>}
      {files.length > 0 && submitButton}
    </Box>
  </div>
)

export const DropzonePreview = (
  {
    className,
    imageClassName,
    style,
    imageStyle,
    fileWithMeta: { cancel, remove, restart },
    meta: { name = '', percent = 0, size = 0, previewUrl, status, duration, validationError },
    isUpload,
    canCancel,
    canRemove,
    canRestart,
    extra: { minSizeBytes },
  }) => {
  let title = `${name || '?'}, ${formatBytes(size)}`
  if (duration) title = `${title}, ${formatDuration(duration)}`

  if (status === 'error_file_size' || status === 'error_validation') {
    return (
      <div className={className} style={style}>
        <span className="dzu-previewFileNameError">{title}</span>
        {status === 'error_file_size' && <span>{size < minSizeBytes ? 'File too small' : 'File too big'}</span>}
        {status === 'error_validation' && <span>{String(validationError)}</span>}
        {canRemove && <CrossIcon className="dzu-previewButton" size="small" onClick={remove}/>}
      </div>
    )
  }

  if (status === 'error_upload_params' || status === 'exception_upload' || status === 'error_upload') {
    title = `${title} (upload failed)`
  }
  if (status === 'aborted') title = `${title} (cancelled)`

  return (
    <div className={className} style={style}>
        {previewUrl && 
        <div style={{marginRight: "8px"}}>
          <img className={imageClassName} style={imageStyle} src={previewUrl} alt={title} title={title} />
        </div>}
        <span className="dzu-previewFileName">{title}</span>

        <div className="dzu-previewStatusContainer">
          {isUpload && (
            <progress max={100} value={status === 'done' || status === 'headers_received' ? 100 : percent} />
          )}

          {status === 'uploading' && canCancel && (
            <Button onClick={cancel}>
              <CrossIcon className="dzu-previewButton" size="small"/>
            </Button>
          )}
          {status !== 'preparing' && status !== 'getting_upload_params' && status !== 'uploading' && canRemove && (
            <Button onClick={remove}>
              <CrossIcon className="dzu-previewButton" size="small" onClick={remove}/>
            </Button>
          )}
          {['error_upload_params', 'exception_upload', 'error_upload', 'aborted', 'ready'].includes(status) &&
            canRestart && <CrossIcon className="dzu-previewButton" size="small" onClick={restart}/>}
        </div>
      </div>
  )
}