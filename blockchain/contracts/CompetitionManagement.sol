pragma solidity ^0.4.15;
import "./Event.sol";


contract CompetitionManagement{
    // Constants
    uint NOMINATION_TIME = 1 days;
    uint NOMINATION_EXPERT_COUNT = 3;

    struct User {
    string name;
    string login;
    string password;
    bool isRegistered;
    }

    struct NominationToExpert{
    uint creation_time;
    address user;
    uint acceptanceCount;
    mapping(address => bool) accepted_experts;
    }

    struct NominationToUser{
    uint creation_time;
    address user;
    uint acceptanceCount;
    address initiator;
    mapping(address => bool) accepted_experts;
    }

    mapping(address => User) _users;
    mapping(address => bool) _experts;

    address[] public event_list;
    NominationToExpert[] public _nominationToExpert;
    NominationToUser[] public _nominationToUser;

    function CompetitionManagement(address[] creators) public {
        // Number of experts should be greater/equal 3
        require(creators.length >= 3);

        // Add addresses as experts
        for(uint i=0; i<creators.length; i++){
            _experts[creators[i]] = true;
        }
    }

    function register(string user_name, string user_login, string user_password) notRegistered public returns(bool) {
        // Register
        _users[msg.sender].name = user_name;
        _users[msg.sender].login = user_login;
        _users[msg.sender].password = user_password;
        _users[msg.sender].isRegistered = true;
        return true;
    }

    function login(string user_login, string user_password) registered public constant returns (bool) {
        bool isCorrect = true;
        isCorrect = isCorrect && (keccak256(_users[msg.sender].login) == keccak256(user_login));
        isCorrect = isCorrect && (keccak256(_users[msg.sender].password) == keccak256(user_password));
        return isCorrect;
    }

    function changeMarkOfParticipant(address event_address, address participant, uint mark) onlyExpert public{
        // Check participant is not expert
        require(_experts[participant] == false);

        Event currentEvent = findEventByAddress(event_address);
        currentEvent.changeMarkOfParticipant(msg.sender, participant, mark);
    }

    function nominateToUser(address expert_address) onlyExpert public {
        // Check is expert_address is expert
        require(_experts[expert_address] == true);

        for(uint i=0; i<_nominationToUser.length; i++){
            if(_nominationToUser[i].user == expert_address){
                // Check is last nomination was not accepted
                if(_nominationToUser[i].acceptanceCount != NOMINATION_EXPERT_COUNT){
                    // Require last nomination is past
                    require(_nominationToUser[i].creation_time + NOMINATION_TIME < now);
                }
                // Update nomination
                _nominationToUser[i] = NominationToUser(now, expert_address, 0, msg.sender);
                return;
            }
        }
        _nominationToUser.push(NominationToUser(now, expert_address, 0, msg.sender));
    }

    function submitNominationToUser(address expert_address) onlyExpert public {
        // Check is expert_address is expert
        require(_experts[expert_address] == true);

        // Find nomination
        for(uint i=0; i<_nominationToUser.length; i++){
            if(_nominationToUser[i].user == expert_address){
                // Nomination is available by time
                require(_nominationToUser[i].creation_time + NOMINATION_TIME > now);
                // Require sender is not initiator
                require(_nominationToUser[i].initiator != msg.sender);
                // Require sender did not submit
                require(_nominationToUser[i].accepted_experts[msg.sender] == false);
                // Accept submition
                _nominationToUser[i].acceptanceCount += 1;
                _nominationToUser[i].accepted_experts[msg.sender] = true;

                // Check submittion results
                if(_nominationToUser[i].acceptanceCount == NOMINATION_EXPERT_COUNT){
                    // Make participant an expert
                    _experts[expert_address] = false;
                }
            }
        }
    }

    function nominateToExpert() onlyParticipant public returns(bool){
        // Create Nomination

        for(uint i=0; i<_nominationToExpert.length; i++){
            if(_nominationToExpert[i].user == msg.sender){
                // Check is last nomination was not accepted
                if(_nominationToExpert[i].acceptanceCount != NOMINATION_EXPERT_COUNT){
                    // Require last nomination is past
                    if (_nominationToExpert[i].creation_time + NOMINATION_TIME > now){
                        return false;
                    }
                }
                // Update nomination
                _nominationToExpert[i] = NominationToExpert(now, msg.sender, 0);
                return true;
            }
        }
        _nominationToExpert.push(NominationToExpert(now, msg.sender, 0));
        return true;
    }

    function submitNominationToExpert(address participant) onlyExpert public returns(bool){
        // Check is participant address is not expert
        if(_experts[participant] == true){return false;}

        // Find nomination
        for(uint i=0; i<_nominationToExpert.length; i++){
            if(_nominationToExpert[i].user == participant){
                // Nomination is available by time
                if(_nominationToExpert[i].creation_time + NOMINATION_TIME < now){return false;}
                // Require expert did not submit
                if(_nominationToExpert[i].accepted_experts[msg.sender] == false){return false;}
                // Accept submition
                _nominationToExpert[i].acceptanceCount += 1;
                _nominationToExpert[i].accepted_experts[msg.sender] = true;

                // Check submittion results
                if(_nominationToExpert[i].acceptanceCount == NOMINATION_EXPERT_COUNT){
                    // Make participant an expert
                    _experts[participant] = true;
                }
                return true;
            }
        }
        return false;
    }

    function getNominationExpert(address participant) onlyExpert public returns(uint) {
        for(uint i=0; i<_nominationToExpert.length; i++){
            if(_nominationToExpert[i].user == participant){
                // Check is last nomination was not accepted
                require(_nominationToExpert[i].acceptanceCount < NOMINATION_EXPERT_COUNT);
                // Require last nomination is not past
                require(_nominationToExpert[i].creation_time + NOMINATION_TIME > now);
                // return index
                return i;
            }
        }
        bool exit = false;
        require(exit == true);
    }

    function createEvent(string name, uint competence_start_date, string competence_name, address[] expert_list, address[] participant_list) public onlyExpert {
        // Check all requirements
        // All addresses should be experts && creator in expert list
        bool isExpertInList = false;
        for (uint i=0; i<expert_list.length;i++){
            require(_experts[expert_list[i]] == true);
            if(expert_list[i] == msg.sender){
                isExpertInList = true;
            }
        }
        require(isExpertInList);

        // All participants should not be experts && registered ?
        for (i=0; i<participant_list.length;i++){
            require(_experts[participant_list[i]] == false);
        }
        // Form Event data structure
        Event newEvent = new Event(msg.sender, name, now, competence_start_date, competence_name, expert_list, participant_list);

        // Add new Event
        event_list.push(address(newEvent));
    }

    function changeEvent(address event_address, string name, uint start_date, string competence, address[] expert_list, address[] participant_list) public{
        Event currentEvent = findEventByAddress(event_address);
        currentEvent.changeEvent(msg.sender, name, start_date, competence, expert_list, participant_list);

    }

    function submitEventEddition(address event_address) public returns(bool) {
        Event currentEvent = findEventByAddress(event_address);
        return currentEvent.submitAcceptence(msg.sender);
    }

    function findEventByAddress(address event_address) private returns(Event){
        bool eventIsFound = false;
        for(uint i=0; i<event_list.length; i++){
            if(event_list[i] == event_address){
                eventIsFound = true;
                return Event(event_list[i]);
            }
        }
        require(eventIsFound);
    }

    function isExpert(address sender) public constant returns(bool){
        return(_experts[sender]);
    }

    function isRegistered(address sender) public constant returns(bool){
        return(_users[sender].isRegistered == true);
    }

    // Modifiers
    modifier onlyExpert {
        require(_experts[msg.sender] == true);
        _;
    }

    modifier onlyParticipant {
        require(_experts[msg.sender] == false);
        _;
    }

    modifier notRegistered {
        // Check is user not reqistered
        require(_users[msg.sender].isRegistered == false);
        _;
    }

    modifier registered {
        // Check is user not reqistered
        require(_users[msg.sender].isRegistered == true);
        _;
    }
}
