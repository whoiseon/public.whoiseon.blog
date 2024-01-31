import TagItem from '@/components/tag/TagItem';
import { useCallback, useEffect, useRef, useState } from 'react';
import { useInput } from '@/lib/hooks/useInput';
import { css } from '@styled-system/css';
import OutsideClickHandler from 'react-outside-click-handler';

interface Props {
  tags: string[];
  onChange: React.Dispatch<React.SetStateAction<string[]>>;
}

function TagInput({ tags: initialTags, onChange }: Props) {
  const [tags, setTags] = useState<string[]>(initialTags);
  const [value, onChangeValue, setValue] = useInput('');
  const ignore = useRef(false);

  useEffect(() => {
    if (tags.length === 0) return;
    onChange(tags);
  }, [tags, onChange]);

  useEffect(() => {
    setTags(initialTags);
  }, [initialTags]);

  const insertTag = useCallback(
    (tag: string) => {
      ignore.current = true;
      setValue('');

      if (tag === '' || tags.includes(tag)) return;

      let processed = tag;
      processed = tag.trim();
      if (processed.indexOf(' #') > 0) {
        const tempTags: string[] = [];
        const regex = /#(\S+)/g;
        let execArray: RegExpExecArray | null = null;
        while ((execArray = regex.exec(processed))) {
          if (execArray !== null) {
            tempTags.push(execArray[1]);
          }
        }

        setTags([...tags, ...tempTags]);
        return;
      }

      if (processed.charAt(0) === '#') {
        processed = processed.slice(1, processed.length);
      }

      setTags([...tags, processed]);
    },
    [tags],
  );

  const onKeyDown = useCallback(
    (e: React.KeyboardEvent<HTMLInputElement>) => {
      if (e.key === 'Backspace' && value === '') {
        setTags(tags.slice(0, tags.length - 1));
        return;
      }

      const keys = [',', 'Enter'];
      if (keys.includes(e.key)) {
        e.preventDefault();
        insertTag(value);
      }
    },
    [value, tags, insertTag],
  );

  const onRemove = (tag: string) => {
    const nextTags = tags.filter((t) => t !== tag);
    setTags(nextTags);
  };

  const onOutSideClick = () => {
    if (value === '') return;
    insertTag(value);
  };

  return (
    <OutsideClickHandler onOutsideClick={onOutSideClick}>
      <div className={tagInputBlock}>
        {tags.map((tag) => (
          <TagItem
            key={tag}
            name={tag}
            onClick={() => onRemove(tag)}
            className={css({ mr: 3, mb: 3 })}
            isText
          />
        ))}
        <input
          className={tagInputStyle}
          placeholder="태그를 입력하세요"
          tabIndex={2}
          value={value}
          onChange={onChangeValue}
          onKeyDown={onKeyDown}
        />
      </div>
    </OutsideClickHandler>
  );
}

const tagInputBlock = css({
  color: 'text1',
  display: 'flex',
  flexWrap: 'wrap',
});

const tagInputStyle = css({
  bg: 'transparent',
  display: 'inline-flex',
  outline: 'none',
  border: 'none',
  cursor: 'text',
  fontSize: '0.875rem',
  lineHeight: '1.5rem',
  minWidth: '8rem',
  mb: 3,
  md: {
    fontSize: '1.125rem',
    lineHeight: '2rem',
  },
  _placeholder: {
    color: 'text5',
  },
});

export default TagInput;
