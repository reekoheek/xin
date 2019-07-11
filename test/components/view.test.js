import assert from 'assert';
import { Fixture } from '@xinix/xin/components';

import '../../scss/xin.scss';
import '../../scss/xin-components.scss';

describe('<xin-view>', () => {
  it('set title', async () => {
    const fixture = await Fixture.create(`
      <xin-app>
        <xin-pager>
          <xin-view uri="/">home</xin-view>
          <xin-view uri="/foo">foo</xin-view>
          <xin-view uri="/bar" title="Bar">bar</xin-view>
        </xin-pager>
      </xin-app>
    `);

    try {
      await fixture.waitConnected();

      assert.strictEqual(fixture.$$('xin-view[uri="/"]').title, 'View /');
      assert.strictEqual(fixture.$$('xin-view[uri="/foo"]').title, 'View /foo');
      assert.strictEqual(fixture.$$('xin-view[uri="/bar"]').title, 'Bar');
    } finally {
      fixture.dispose();
      location.hash = '#';
    }
  });
});
