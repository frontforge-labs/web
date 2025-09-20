import {
  ToolContainer as UIToolContainer,
  type ToolContainerProps,
} from "@frontenzo/ui";
import { Breadcrumb } from "./Breadcrumb";

// Re-export the UI component with breadcrumb integration
export function ToolContainer({
  title,
  description,
  children,
  generatedCSS,
  onReset,
  showPreview = true,
  previewElement,
  icon,
  ...props
}: Omit<ToolContainerProps, "breadcrumbs">) {
  return (
    <UIToolContainer
      title={title}
      description={description}
      children={children}
      generatedCSS={generatedCSS}
      onReset={onReset}
      showPreview={showPreview}
      previewElement={previewElement}
      icon={icon}
      breadcrumbs={<Breadcrumb />}
      {...props}
    />
  );
}
