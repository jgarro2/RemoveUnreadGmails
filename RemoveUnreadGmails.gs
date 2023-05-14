function removeUnreadGmails(search, batchAction) {
  var threads = GmailApp.search("is:unread");
  if (threads.length == 0){
    Logger.log("There are no unread emails in your inbox!");
    Logger.log("There is no need to run the script again");
  } else {
    if (threads.length >= 500) {
      Logger.log("There are more than " + threads.length + " unread emails in your inbox."); 
      Logger.log("500 messages will be moved to trash."); 
    } else if (threads.length > 0) {
      Logger.log("There are " + threads.length + " unread emails in your inbox.");
      Logger.log("These messages will be moved to trash.");
    } else {
      Logger.log("There are no unread emails in your inbox!");
      Logger.log("There is no need to run the script again");
    }
    var completionRate = 0;
    for (var i = 0; i < threads.length; i++) {
      completionRate = (i + 1) / threads.length * 100;
      completionRate = completionRate.toFixed(0);
      if (threads[i].isUnread()) {      
        threads[i].moveToTrash();
      }
      if ( completionRate % 10 == 0 ) {
        Logger.log("... " + i + " messages moved (" + completionRate +"% done)");
      }   
    }
    Logger.log(threads.length + " messages have been moved to trash.");
    threads = GmailApp.search("is:unread");
    if (threads.length >= 500) {
      Logger.log("More than " + threads.length + " unread emails remain in your inbox."); 
      Logger.log("Run the script again.");
    } else if (threads.length > 0){
      Logger.log(threads.length + " unread emails remain in your inbox.");
      Logger.log("Run the script again.");
    } else {
      Logger.log("There are no unread emails in your inbox!");
      Logger.log("There is no need to run the script again");
    }
  }
}
