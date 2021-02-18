import React from "react";
import styled from "styled-components";

export default function Services() {
  return (
    <Container>
      <Title>
        မင်္ဂလာပါခင်ဗျာ Telemart Myanmar မှ နွေးထွေးစွာကြိုဆိုလိုက်ပါတယ်။
      </Title>
      <Wrapper>
        <Intro>
            လူကြီးမင်းတို့ရဲ့နေ့စဥ်ဘဝမှာလိုအပ်တဲ့ TV, Smart Phone, Smart Watch,
            Electronic ပစ္စည်းများစွာကို Telemart Myanmar Website မှာ
            အချိန်မရွေးကြည့်ရှုရွေးချယ်၍ Chat Box လေးမှတစ်ဆင့် Order
            မှာယူနိုင်ပါသည်။
        </Intro>
        <Follow>
            <p>
            👉 Delivery Service အနေဖြင့် ဝယ်ယူအားပေးသော Customerများအတွက်
            ရန်ကုန်မြို့တွင်းနှင့်မန္တလေးမြို့တွင်း အိမ်အရောက် Free Delivery
            Service ဖြင့် မှာယူသည့်အချိန်မှစ၍ နာရီ (၄၀) အတွင်း
            အမြန်ဆုံးပို့ဆောင်ပေးပါသည်။
            </p>
            <p>
            👉 ဝယ်ယူအားပေးလိုသော Product လေးများနဲ့ ပက်သက်ပြီး
            နားမလည်တာ၊မရှင်းတာလေးများရှိရင်လည်း သိလိုသမျှ​မေးခွန်းများကို Chat Box
            သို့မဟုတ် Hotline - 0975600188(YGN), 09756000186(MDY) သို့
            အချိန်မရွေးဆက်သွယ်မေးမြန်းနိုင်သလို၊
            </p>
            <p>
            👉 After service အနေဖြင့်လည်း ဝယ်ယူအားပေးခဲ့သော Customer များမှ
            အခက်အခဲတစ်စုံတစ်ရာရှိမရှိ ပြန်လည်မေးမြန်းပေးပီး မသိတာ နားမလည်များအတွက်
            ပြန်လည်ရှင်းပြပေးခြင်း၊ သိလိုတာများအတွက်လဲ Chat box သို့မဟုတ် Hotline-
            09756000188(YGN), 09756000186(MDY)
            သို့ဆက်သွယ်၍အကူအညီရယူနိုင်ပါတယ်ခင်ဗျာ။
            </p>
        </Follow>
      </Wrapper>
    </Container>
  );
}

const Container = styled.div`
  width: 80vw;
  margin: auto;
  padding: 100px 0px;
  min-height: 100vh;
  height: max-content;
  @media only screen and (max-width: 600px) {
      width: 90vw;
      padding: 80px 0px;
  }
`;

const Title = styled.h2`
  text-align: center;
  font-weight: bold;

  @media only screen and (max-width: 600px) {
     font-size: 20px;
  }
`;

const Intro = styled.p`
  text-align: center;
  color: rgba(0,0,0,0.6)
`;

const Follow = styled.div`
    margin-top: 50px;
    p {
        margin-bottom: 15px;
    }
`;

const Wrapper = styled.div`
    font-size: 15px;

 @media only screen and (max-width: 600px) {
     font-size: 14px;
  }
`;
