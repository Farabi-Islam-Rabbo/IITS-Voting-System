import React from "react";
import ReactLoading from "react-loading";

function ButtonWithLoading({
  title,
  className,
  color,
  loading,
  type,
  onClick,
  disabled,
}) {
  return (
    <button
      className={className}
      disabled={loading || disabled}
      type={type}
      onClick={() => onClick()}
    >
      <div className="flex flex-row justify-center">
        {!loading ? (
          <p>{title}</p>
        ) : (
          <ReactLoading type="spin" color={color} height={28} width={28} />
        )}
      </div>
    </button>
  );
}

export default ButtonWithLoading;
