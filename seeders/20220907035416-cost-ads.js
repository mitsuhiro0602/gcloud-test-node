'use strict';

module.exports = {
  async up (queryInterface, Sequelize) {
    /**
     * Add seed commands here.
     *
     * Example:
     * await queryInterface.bulkInsert('People', [{
     *   name: 'John Doe',
     *   isBetaMember: false
     * }], {});
     */

    const now = new Date();
    // 美髪,転職,派遣,マッチング,ゲーム,記事,ドッグ,派遣アグリ,看護,記事e,ダイエット,プログラミング,睡眠,葉酸,英語,メンズ脱毛,コスメ,介護,AD記事
    return queryInterface.bulkInsert('costs_ads', [
      {ad_name: '未分類' , created_at: now, updated_at: now},
      {ad_name: '美髪' , created_at: now, updated_at: now},
      {ad_name: '転職' , created_at: now, updated_at: now},
    ], {});
  },

  async down (queryInterface, Sequelize) {
    /**
     * Add commands to revert seed here.
     *
     * Example:
     * await queryInterface.bulkDelete('People', null, {});
     */
  }
};
