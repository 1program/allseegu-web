import { Auditable, Entity } from "../common";

export interface AlimSetting extends Auditable, Entity {
  notice_alim: 1 | 0;
  qna_alim: 1 | 0;
  request_alim: 1 | 0;
  promotion_alim: 1 | 0;
  email_alim: 1 | 0;
  sms_alim: 1 | 0;
}
