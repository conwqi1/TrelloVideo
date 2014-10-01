TrelloVideo.Views.ListShow = Backbone.CompositeView.extend({
  template: JST ['lists/show'],
  className: "content-container-cards",
  tagName: "li",
  initialize: function(){
    this.collection = this.model.cards();
    this.collection.each(this.addCard.bind(this));
    this.listenTo(this.model, 'sync', this.render);
    this.listenTo(this.collection, 'add', this.addCard);
    this.listenTo(this.collection, 'remove', this.removeCard);
  },
  
  events: {"submit #createCard":"createCard",
            "click #deleteCard":"deleteCard"},
  
  createCard: function(event){
    event.preventDefault();
    var $target = $(event.currentTarget);
    var title = $target.find('#card_title').val();
    var description = $target.find('#card_description').val();
    var listId = $target.data('id');
    var ord = this.collection.length;
    this.collection.create({
      list_id: listId,
      title: title,
      description: description,
      ord: ord
    });
    $target.find('#card_title').val('');
    $target.find('#card_description').val('');
  },
  
  deleteCard: function(event){
    event.preventDefault();
    var $target = $(event.currentTarget); 
    var id = $target.data('id');
    var model = this.collection.get(id);
    model.destroy();
  },
  
  addCard: function(card){
    var view = new TrelloVideo.Views.CardShow({
      model: card
    });
    this.addSubview('.cards-container', view);
  },

  removeCard: function(list){
    var view = _.find( 
      this.subviews(".cards-container"),
      function(view){
        return view.model === list;
      });
    this.removeSubview(".cards-container", view)
  },
  
  render: function(){
    var renderContent = this.template({
      list: this.model
    });
    this.$el.html(renderContent);
    this.attachSubviews();
    return this;
  },
  

  
});