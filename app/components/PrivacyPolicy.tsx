'use client';
import { Dispatch, ReactNode, SetStateAction } from 'react';
import Accordian from './UI/nextUI/Accordian';
import { 개인정보수집동의 } from '@/public/policies/개인정보수집동의';
import { Checkbox } from '@nextui-org/react';
import { 개인정보처리방침 } from '@/public/policies/개인정보처리방침';
type PrivacyPolicyProps = {
  setPrivacyConfirm: Dispatch<SetStateAction<boolean>>;
};
const PrivacyPolicy = ({ setPrivacyConfirm }: PrivacyPolicyProps): ReactNode => {
  return (
    <div className='flex w-full flex-col items-center self-center'>
      <Accordian
        contents={[
          ['개인정보 수집 및 이용 약관', 개인정보수집동의],
          ['개인정보 처리방침', 개인정보처리방침],
        ]}
      />
      <div>
        <div className='items-center py-8 text-center leading-6'>
          <Checkbox radius='sm' onChange={({ target: { checked } }) => setPrivacyConfirm(checked)} />위 사항을 확인했고
          개인정보 수집 및 이용에 동의합니다.
        </div>
      </div>
    </div>
  );
};

export default PrivacyPolicy;
