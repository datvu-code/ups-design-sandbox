import React from "react";
import { Button as AntdButtonBase } from "antd";

const ChevronDownIcon = () => (
  <svg width="16" height="16" viewBox="0 0 16 16" fill="none" xmlns="http://www.w3.org/2000/svg">
    <path d="M4 6L8 10L12 6" stroke="currentColor" strokeWidth="1" strokeLinecap="round" strokeLinejoin="round" />
  </svg>
);

const TYPE_MAP = {
  primary: "primary",
  secondary: "default",
  link: "link",
};

// Layout/geometry only — no color classes
const getButtonSizeClasses = (size, variant) => {
  if (variant === "link") return "";
  const sizeMap = {
    small:   "tw-h-button-small tw-min-h-button-small tw-p-button-small",
    default: "tw-h-button-default tw-min-h-button-default tw-p-button-default",
    medium:  "tw-h-button-medium tw-min-h-button-medium tw-p-button-medium",
    large:   "tw-h-button-large tw-min-h-button-large tw-p-button-large",
  };
  return sizeMap[size] || sizeMap.default;
};

const renderIcon = (icon) => {
  if (!icon) return null;
  return (
    <span className="tw-flex tw-items-center">
      {icon === "chevron-down" ? <ChevronDownIcon /> : icon}
    </span>
  );
};

const AntdButton = React.forwardRef(({
  children,
  leftIcon,
  rightIcon,
  variant = "primary",
  size = "default",
  disabled = false,
  className = "",
  style = {},
  onClick,
  type = "button",
  ...props
}, ref) => {
  const buttonClasses = [
    "tw-inline-flex tw-items-center tw-justify-center tw-gap-button-icon tw-whitespace-nowrap",
    getButtonSizeClasses(size, variant),
    className,
  ].filter(Boolean).join(" ");

  return (
    <AntdButtonBase
      ref={ref}
      type={TYPE_MAP[variant] || "primary"}
      htmlType={type}
      className={buttonClasses}
      style={style}
      disabled={disabled}
      onClick={onClick}
      {...props}
    >
      {renderIcon(leftIcon)}
      {children ? <span>{children}</span> : null}
      {renderIcon(rightIcon)}
    </AntdButtonBase>
  );
});

export { AntdButton };
export default AntdButton;
