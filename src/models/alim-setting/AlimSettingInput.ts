export interface AlimSettingInput {
  notice_alim: 1 | 0;
  qna_alim: 1 | 0;
  request_alim: 1 | 0;
  promotion_alim: 1 | 0;
  email_alim: 1 | 0;
  sms_alim: 1 | 0;
}

export const defaultAlimSettingInput: AlimSettingInput = {
  notice_alim: 1,
  qna_alim: 1,
  request_alim: 1,
  promotion_alim: 0,
  email_alim: 0,
  sms_alim: 0,
};
