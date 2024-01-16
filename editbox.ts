import React, { useState, useEffect, useRef } from "react";

// TextInput 컴포넌트의 초기값을 받아오는 Props 정의
interface TextInputProps {
  init: string;
}

function TextInput({ init }: TextInputProps) {
  // ref를 생성
  const ref = useRef(null);
  // 상태 변수들 초기화
  const [text, setText] = useState(init);
  const [editable, setEditable] = useState(false);

  // 편집 모드로 전환하는 함수
  const editOn = () => {
    setEditable(true);
  };

  // 입력 내용이 변경될 때 호출되는 함수
  const handleChange = (e) => {
    setText(e.target.value);
  };

  // Enter 키를 눌렀을 때 호출되는 함수
  const handleKeyDown = (e) => {
    if (e.key === "Enter") {
      setEditable(!editable);
    }
  };

  // 컴포넌트 외부를 클릭했을 때 호출되는 함수
  const handleClickOutside = (e) => {
    // 편집 모드이면서 ref 외부를 클릭했을 때만 편집 모드 비활성화
    if (editable && !ref.current.contains(e.target)) setEditable(false);
  };

  // 컴포넌트가 마운트될 때, 언마운트될 때만 이벤트 리스너 등록 및 해제
  useEffect(() => {
    window.addEventListener("click", handleClickOutside, true);
    return () => {
      window.removeEventListener("click", handleClickOutside, true);
    };
  }, []); // 빈 배열을 전달하여 컴포넌트가 마운트될 때 한 번만 실행

  return (
    <>
      <div ref={ref}>
        {editable ? (
          <input type="text" value={text} onChange={(e) => handleChange(e)} onKeyDown={handleKeyDown} />
        ) : (
          <div onClick={() => editOn()}>{text}</div>
        )}
      </div>
    </>
  );
}

export default TextInput;
