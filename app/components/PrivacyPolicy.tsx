'use client';
import { Dispatch, ReactNode, SetStateAction } from "react";
type PrivacyPolicyProps = {
    setPrivacyConfirm: Dispatch<SetStateAction<boolean>>
}
const PrivacyPolicy = ({setPrivacyConfirm}:PrivacyPolicyProps):ReactNode => {

    return <div className="w-full mt-20 flex flex-col items-center">
        <div className="w-4/5">
            <p className="p-2">개인정보 수집 및 이용 동의<em className="text-red-400">*</em></p>
            <div className="w-full h-24 p-2 border-[1px] overflow-scroll leading-6 border-black border-solid">
                <h1 className="font-bold">개인정보 수집에 대한 동의</h1>
                <br/>
                <h1 className="font-bold">개인정보 수집 및 이용 목적</h1>
                이용자가 제공한 모든 정보는 다음의 목적을 위해 활용하며, 목적 이외의 용도로는 사용되지 않습니다.<br/>
                -본인확인 및 경연대회 접수
                <br/><br/>
                <h1 className="font-bold">개인정보 수집 및 이용 항목</h1>
                성균관대학교 무용학과는 개인정보 수집 목적을 위하여 다음과 같은 정보를 수집합니다.<br/>
                -성명, 전화번호, 이메일, 성별, 나이, 생년월일, 학교명
                <br/><br/>
                <h1 className="font-bold"> 개인정보 보유 및 이용 기간</h1>
                1. 수집한 개인정보는 수집·이용 동의일로부터 개인정보 수집·이용 목적을 달성할 때까지 보관 및 이용합니다.
                2. 개인정보 보유기간의 경과, 처리목적의 달성 등 개인정보가 불필요하게 되었을 때에는 지체없이 해당 개인정보를 파기합니다.
                <br/><br/>
                <h1 className="font-bold">동의 거부관리</h1>
                귀하는 본 안내에 따른 개인정보 수집·이용에 대하여 동의를 거부할 권리가 있습니다. 다만, 귀하가 개인정보 동의를 거부하시는 경우에 경연대회 접수가 불가함을 알려드립니다.
            </div>
            <div className="p-2 items-center">
                위 사항을 확인했고 개인정보 수집 및 이용에 동의합니다.
                <input 
                  className="ml-1" 
                  type="checkbox"
                  onChange={({ target: { checked } }) => setPrivacyConfirm(checked)}
                />
            </div>
        </div>
    </div>
}

export default PrivacyPolicy;