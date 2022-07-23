import InputErrorMessages from '@/constants/InputErrorMessages';
import { MetaKeys } from '@/core/Database/types/meta';
import DbItem from '@/core/Database/DbItem';

export type IGuideArticle = {
    name: string;
    title: string;
};

export default class GuideArticle extends DbItem<IGuideArticle> {
  constructor(reservation?: IGuideArticle, meta: MetaKeys = {
    createdAt: Date.now().toLocaleString('Fr'),
  }) {
    super('GUIDE', reservation, meta);
  }

  public isValid(): null | Partial<Record<keyof IGuideArticle, InputErrorMessages>> {
    if (!this.data) {
      throw new Error('no payload');
    }

    return null;
  }
}
