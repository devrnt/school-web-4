import { Pipe, PipeTransform } from '@angular/core';
import { Pinboard } from '../../models/pinboard.model';

@Pipe({
  name: 'pinboardFilter'
})
export class PinboardFilterPipe implements PipeTransform {

  transform(pinboards: Pinboard[], name: string): Pinboard[] {
    if (!name || name.length === 0) {
      return pinboards;
    }

    return pinboards.filter(pinboard => pinboard.city && pinboard.city.toLowerCase().startsWith(this.formatText(name)))
  }

  formatText(text: string): string {
    return text.trim().replace(/\s/g, "").toLowerCase();
  }

}
